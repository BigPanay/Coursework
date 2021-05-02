import { Injectable, HttpException, HttpStatus, UseInterceptors } from '@nestjs/common';
import {Response, Request} from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserInput } from './dto/registerUser.input';
import { LoginUserInput } from './dto/loginUser.input';
import { User } from '../../entities/user.entity';
import {ResponseMessage} from '../../interfaces/responseMessage';
import {Log} from '../../common/utils/logging/Log';
import {AuthService} from '../../auth/auth.service'
import { AuthUtils } from '../../auth/utils/auth.utils';
import { PaginationArgs } from '../../common/pagination/pagination.args';
import { LikeConnection } from '../../models/pagination/like.connection.model';
import { SubscriptionConnection } from '../../models/pagination/following.connection.model';
import { PageInfo } from '../../common/pagination/page-info.model';
import { Following } from '../../entities/subscribed.entity';
import { Like } from '../../entities/likes.entity';
import { UserSubscription } from '../../entities/subscriptions.entity';
import { UserOrder } from './dto/user-order.input';
import * as helper from '../../helpers/index';
import {UpdateUserInput} from './dto/updateUser.input';
import { Payload } from '../../interfaces/IPayload';
import { MyContext } from '../../types/myContext';

@Injectable()
export class UserService {
    //First thing to run
    public constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(UserSubscription)
        private readonly subscriptionRepository: Repository<UserSubscription>,
        @InjectRepository(Following)
        private readonly followingRepository: Repository<Following>,
        @InjectRepository(Like)
        private readonly likeRepository: Repository<Like>,
        private readonly authService: AuthService,
    ) { }
    
    public async loginUser(loginInput: LoginUserInput, res: Response): Promise<User> {

        let userToLogin: User;

        await this.findAUserWithCustomRelation({email: loginInput.email}, []).then((user) => {
            userToLogin = user;
        }).catch(error => {
            throw new HttpException("Email or password is incorrect", HttpStatus.UNPROCESSABLE_ENTITY)
        });
    
        if (!(await AuthUtils.compare(loginInput.password, userToLogin.password))) {
            throw new HttpException("Email or password is incorrect", HttpStatus.UNPROCESSABLE_ENTITY)
        }

        let access_token = await this.authService.sign(userToLogin);

        res.cookie('usr', access_token, {signed: true});

        return userToLogin;
    }

    public async registerUser(registerInput: RegisterUserInput, res: Response): Promise<ResponseMessage> {
        
        await this.emailRegex(registerInput.email);

        await this.passwordRegex(registerInput.password);

        await this.userExists({email: registerInput.email}, 'Email');

        await this.userExists({username: registerInput.username}, 'Username');

        if(registerInput.password != registerInput.confirmPassword) {
            throw new HttpException(
                'Passwords do not much',
                HttpStatus.UNPROCESSABLE_ENTITY,
            );
        }

        const userEntity = new User();
        await userEntity.setUserEntityByRegisterUserInput(registerInput);

        //Saves to database
        await this.userRepository.save(userEntity);
        delete userEntity.password;

        let access_token = await this.authService.sign(userEntity);

        res.cookie('usr', access_token, {signed: true});

        return Promise.resolve({
            status: 'Success',
            info: 'User created',
            access_token: access_token.access_token,
        });
    }

    private async emailRegex(email: string): Promise<boolean> {
        Log.server.info(`UserService - Start - Email Regex: Verifying user's email -: ${email}`);

        const regexEmail = /^[a-z0-9-_]+(?:\.[a-z0-9-_]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.){1,2}[a-z0-9](?:[a-z0-9-]*[a-z0-9])$/;

        if (!regexEmail.test(email)) {
            throw new HttpException(
                "Only letters (a-Z), numbers (0-9) and these characters ('_' '-' '.') are allowed",
                HttpStatus.UNPROCESSABLE_ENTITY,
            );
        }

        Log.server.info(`UserService - End - Email Regex: Verified user's email`);

        return true;
    }

    
    private async passwordRegex(password: string): Promise<boolean> {
        Log.server.info(`UserService - Start - Password Regex: Verifying user's password`);

        const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{3,})(?=.*[#$£^+=!*()@%&{}';:><?]).{8,30}$/g;

        if (!regexPassword.test(password)) {
            throw new HttpException(
                'Password must be between 8-30 characters, 3 or more digits, a uppercase character, lowercase character and special characters',
                HttpStatus.UNPROCESSABLE_ENTITY,
            );
        }

        Log.server.info(`UserService - End - Password Regex: Verified user's password`);

        return true;
    }

    private async userExists(userExists: any, arg: string): Promise<boolean> {
        const user = await this.userRepository.findOne(userExists);
        if (!!user == true) {
            throw new HttpException(`${arg} already exists`, HttpStatus.CONFLICT);
        } else {
            return !!user;
        }
    }

    private async findAUserWithCustomRelation(query: any, relations: string[]): Promise<User>{
        const user = await this.userRepository.findOne(query, {relations: relations});
        if (!user){
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        } 
        return user;
    }

    public async getUserInformation(
        {...args}: PaginationArgs,
        username: string,
        orderBy: UserOrder,
    ): Promise<User> {
        Log.api.debug(
            `User Service - Start - getUserInformation: Return info for a user: username -: ${username} : orderBy - ${JSON.stringify(
                orderBy,
            )} : PaginationArgs -: ${JSON.stringify({
                ...args,
            })}`,
        );
        //creating GraphyQL connetions
        const likeConnection = new LikeConnection();
        const subscriptionConnection = new SubscriptionConnection();
        //first 10 results returned
        const defaultLimit: number = 10;
        const encodeField: string = 'created_at';
        let pageInfo: PageInfo = new PageInfo();
        let subscriptionIds: number[] = [];
        let postIds: string[] = [];
        let followersQueryBuilder: [Following[], number] = [new Array<Following>(), 0];
        let likesQueryBuilder: [Like[], number] = [new Array<Like>(), 0];

        likeConnection.edges = [];
        subscriptionConnection.edges = [];

        const userSearch: User = await this.findAUserWithCustomRelation({username: username}, [
            'info',
            'subscriptions',
            'posts',
        ]);

        userSearch.subscriptions.forEach(subscription => {
            subscriptionIds.push(subscription.id);
        });

        //Gets all the followers from the users subscriptions 
        if (subscriptionIds.isNotEmpty()) {
            followersQueryBuilder = await this.followingRepository
                .createQueryBuilder('followers')
                .where('followers.subscriptionsId IN (:userSubscriptions)', {
                    userSubscriptions: subscriptionIds,
                })
                .take((args.first ? args.first : defaultLimit) + 1)
                .orderBy(orderBy ? {['followers.' + orderBy.field]: orderBy.direction} : null)
                .skip(args.skip)
                .getManyAndCount();
        }

        userSearch.posts.forEach(post => {
            postIds.push(post.id);
        });

        if (postIds.isNotEmpty()) {
            likesQueryBuilder = await this.likeRepository
                .createQueryBuilder('like')
                .where('like.postId IN (:postIds)', {postIds: postIds})
                .take(10)
                .getManyAndCount();
        }

        //setting up the Graphql and useing edges and nodes as a part of the Graphql practices

        let likesQueryResult = likesQueryBuilder[0];

        let followersQueryResult = followersQueryBuilder[0];

        if (followersQueryResult.length > args.first) {
            pageInfo.hasNextPage = true;
        } else if (followersQueryResult.length > defaultLimit) {
            pageInfo.hasNextPage = true;
        } else {
            pageInfo.hasNextPage = false;
        }

        subscriptionConnection.totalCount = followersQueryBuilder[1];
        likeConnection.totalCount = likesQueryBuilder[1];

        followersQueryResult.forEach(followers => {
            subscriptionConnection.edges.push({
                node: followers,
                cursor: helper.encodeCursor(followers[encodeField].toString()),
            });
        });
        subscriptionConnection.pageInfo = pageInfo;

        if (likesQueryResult.length > args.first) {
            pageInfo.hasNextPage = true;
        } else if (likesQueryResult.length > defaultLimit) {
            pageInfo.hasNextPage = true;
        } else {
            pageInfo.hasNextPage = false;
        }

        likesQueryResult.forEach(like => {
            likeConnection.edges.push({
                node: like,
                cursor: helper.encodeCursor(like.id.toString()),
            });
        });

        userSearch.edge_followers = subscriptionConnection;
        userSearch.edge_like = likeConnection;
        return userSearch;
    }

    public async updateUserInformation(user: UpdateUserInput, ctx: MyContext): Promise<User> {
        Log.server.debug(
            `UserService - Start - update: updating users info user-: ${JSON.stringify(user)}`,
        );

        let userToUpdate: User;

        await this.findAUserWithCustomRelation({id: user.id}, ['info'])
            .then((value: User) => {
                userToUpdate = value;
            })
            .catch(error => {
                Log.api.debug(`Error getting user info ${error}`);
                throw new HttpException('No user found', HttpStatus.NOT_FOUND);
            });

        if (user.password !== null && user.password !== undefined) {
            if (!(await AuthUtils.compare(user.password, userToUpdate.password))) {
                throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
            }

            if (user.newPassword !== undefined && user.confirmPassword !== undefined) {
                if (user.newPassword != user.confirmPassword) {
                    throw new HttpException(
                        'Passwords do not match',
                        HttpStatus.UNPROCESSABLE_ENTITY,
                    );
                } else {
                    await this.passwordRegex(user.confirmPassword);
                    const password = await AuthUtils.hash(user.confirmPassword);
                    userToUpdate.password = password;
                }
            } else if (user.newPassword !== undefined && user.confirmPassword == undefined) {
                throw new HttpException('Did not confirm password', HttpStatus.BAD_REQUEST);
            }
        }

        try {
            if (user.username !== null && user.username !== undefined) {
                await this.userExists({username: user.username}, 'Username');
                userToUpdate.username = user.username;
            }

            if (user.email !== null && user.email !== undefined) {
                user.email = user.email.toLowerCase();
                await this.emailRegex(user.email);
                await this.userExists({email: user.email}, 'Email');
                userToUpdate.email = user.email;
            }

            if (user.displayName !== null && user.displayName !== undefined) {
                userToUpdate.display_name = user.displayName;
            }
    
            if (user.displayName !== null && user.displayName !== undefined ) {
                userToUpdate.display_name = user.displayName;
            }

            if (user.profileDescription !== null && user.profileDescription !== undefined) {
                userToUpdate.profile_description = user.profileDescription;
            }

            if (user.first_name !== null && user.first_name !== undefined) {
                userToUpdate.first_name = user.first_name;
            }

            if (user.last_name !== null && user.last_name !== undefined) {
                userToUpdate.last_name = user.last_name;
            }
        } catch (error) {
            Log.api.debug('Error has occured when updating user ' + error);
            throw new HttpException(
                'An error has occured on the server',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

        let access_token = await this.authService.sign(userToUpdate);
        ctx.res.cookie('usr', access_token, {signed: true});

        await this.userRepository.save(userToUpdate);

        Log.server.debug('UserService - End - update: Successfully updated user information');

        return userToUpdate;
    }

}

import {Resolver, Query, Mutation, Args, Context} from '@nestjs/graphql';
import {User} from '../../entities/user.entity';
import {UserService} from './user.service';
import {RegisterUserInput} from './dto/registerUser.input';
import {ResponseMessage} from '../../interfaces/responseMessage';
import {UpdateUserInput} from './dto/updateUser.input';
// import {LoginInput} from './dto/login.input';
import {AuthObject} from './dto/auth.dto';
import {Inject, UseInterceptors, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {LoginGuard, CurrentUser} from '../../common/guards/login.guard';
import {MyContext} from '../../types/myContext';
import {AuthUtils} from '../../auth/utils/auth.utils';
import {Log} from '../../common/utils/logging/Log';
// import {NewSubcriptionInput} from './dto/subscription.input';
// import {NewFollowingInput} from './dto/following.input';
import {UserOrder} from './dto/user-order.input';
import {PaginationArgs} from '../../common/pagination/pagination.args';
import {Payload} from '../../interfaces/IPayload';
import { LoginUserInput } from './dto/loginUser.input';


@Resolver('Users')
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    // POST
    @Mutation(() => ResponseMessage)
    public async registerUser(
        @Args('registerUser') registerUser: RegisterUserInput,
        @Context() ctx: MyContext,
    ): Promise<ResponseMessage> {
        return await this.userService.registerUser(registerUser, ctx.res);
    }

    @Mutation(() => User)
    public async loginUser(
        @Args('login') loginUser: LoginUserInput,
        @Context() ctx: MyContext,
    ): Promise<User> {
        return await this.userService.loginUser(loginUser, ctx.res);
    }

    @Mutation(() => User)
    // @UseGuards(LoginGuard)
    public async updateUser(
        @Args('updateUser') @CurrentUser() updateUser: UpdateUserInput,
        @Context() ctx: MyContext,
    ): Promise<User> {
        return await this.userService.updateUserInformation(updateUser, ctx);
    }
    
    //This authenticate the user by getting the cookie sent by the client and checks there is a user cookie sent by loginUser() and registerUser()
    @Query(() => AuthObject)
    // @UseGuards(LoginGuard)
    public async authenticateUser(@Context() ctx: MyContext): Promise<AuthObject> {
        let auth = new AuthObject();
        let jwtToken = ctx.req.signedCookies.usr.access_token;
        const payload: Payload = AuthUtils.decodeToken(jwtToken);
        Log.api.debug('payload', payload);
        auth.user_id = payload.sub;
        auth.username = payload.username;
        // Log.api.debug("user ID ", auth.user_id)
        return auth;
    }

    @Query(() => User)
    // @UseGuards(LoginGuard)
    public async getByUsername(
        @Args() {skip, after, before, first, last}: PaginationArgs,
        @Args('username') username: string,
        @Args({
            name: 'orderBy',
            type: () => UserOrder,
            nullable: true,
        })
        orderBy: UserOrder,
    ): Promise<User> {
        return await this.userService.getUserInformation(
            {skip, after, before, first, last},
            username,
            orderBy,
        );
    }
}

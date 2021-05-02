import {
    Column,
    Entity,
    ObjectIdColumn,
    PrimaryGeneratedColumn,
    PrimaryColumn,
    OneToMany,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import {RegisterUserInput} from '../resolvers/user/dto/registerUser.input';
import shortid from 'shortid';
import {AuthUtils} from '../auth/utils/auth.utils';
import {Post} from './post.entity';
import {UserInfo} from './userInfo.entity';
import {Directive, Field, ID, ObjectType} from '@nestjs/graphql';
import {Comment} from './comments.entity';
import {Like} from './likes.entity';
import {Following} from './subscribed.entity';
import {UserSubscription} from './subscriptions.entity';
import {SubscriptionConnection} from '../models/pagination/following.connection.model';
import {LikeConnection} from '../models/pagination/like.connection.model';

@Entity({name: 'Users'})
@ObjectType()
export class User {
    @Field(type => ID)
    @PrimaryColumn({name: "id"})
    id: string;

    @Field()
    @Column({default: ''})
    profile_description: string;

    @Field()
    @Column({default: ''})
    display_name: string;

    @Field()
    @Column({length: 25})
    username: string;

    @Field()
    @Column({length: 25, default: ''})
    first_name: string;

    @Field()
    @Column({length: 25, default: ''})
    last_name: string;

    @Field({nullable: true})
    @Column()
    email?: string;

    @Column()
    password: string;

    @Column({type: 'timestamp'})
    updated_at: Date;

    @Field(type => [Post])
    @OneToMany(type => Post, post => post.owner, {
        cascade: true,
    })
    posts?: Post[];

    @Field(type => [Comment])
    @OneToMany(type => Comment, comment => comment.owner)
    comments?: Comment[];

    @Field(type => [Like])
    @OneToMany(type => Like, like => like.owner, {
        cascade: true,
    })
    likes: Like[];

    @Field(type => [UserSubscription])
    @OneToMany(type => UserSubscription, subscription => subscription.owner, {
        cascade: true,
    })
    subscriptions: UserSubscription[];

    @Field(type => UserInfo)
    @OneToOne(type => UserInfo, {cascade: true})
    @JoinColumn()
    info: UserInfo;

    @Field(type => Following)
    @OneToMany(type => Following, following => following.owner)
    following: Following;

    @Field(type => SubscriptionConnection, {nullable: true})
    followingConnection: SubscriptionConnection;

    @Field(type => SubscriptionConnection, {nullable: true})
    edge_followers: SubscriptionConnection;


    @Field(type => LikeConnection, {nullable: true})
    edge_like: LikeConnection;

    /**
     * When the user has blocked the viewer
     */
    @Field()
    blocked_by_user: boolean;

    /**
     * When the viewer has blocked the user
     */
    @Field()
    has_blocked_user: boolean;

    public async setUserEntityByRegisterUserInput(
        registerUserInput: RegisterUserInput,
    ): Promise<void> {
        const userInfo = new UserInfo();
        await userInfo.newUserInfo();
        this.id = shortid.generate();
        this.username = registerUserInput.username;
        this.email = registerUserInput.email;
        this.password = await AuthUtils.hash(registerUserInput.password);
        this.info = userInfo;
    }

}
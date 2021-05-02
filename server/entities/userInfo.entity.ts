import {
    Column,
    Entity,
    PrimaryGeneratedColumn,

} from 'typeorm';

import {Directive, Field, ID, ObjectType} from '@nestjs/graphql';
import {BaseModel} from '../models/base.model';

@Entity({name: 'ky9K7AxM_UsersInfo'})
@ObjectType()
export class UserInfo extends BaseModel {
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * is_verified is for the blue tick
     */
    @Field()
    @Column({default: false})
    is_verified: boolean;

    /**
     * account verified is to make sure the user says who they are
     */
    @Field({nullable: true})
    @Column({default: false})
    account_verified: boolean;

    @Field()
    @Column({default: false})
    is_email_verified: boolean;

    @Field()
    @Column({default: false})
    is_deleted?: boolean;

    @Field()
    @Column({default: null})
    date_deleted?: string;

    @Column({default: false})
    is_user_blocked: boolean;

    // @Field()
    // @Column({default: null})

    // @Field()
    // @ManyToMany()
    // blocked_users: string;

    // @Field()
    // favourite_posts

    // @Field()
    // bookmarked_posts

    public async newUserInfo(): Promise<void> {
        this.precise_time = Date.now().toString();
    }
}

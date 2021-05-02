import {
    Column,
    Entity,
    ObjectIdColumn,
    PrimaryGeneratedColumn,
    PrimaryColumn,
    OneToMany,
    OneToOne,
    ManyToOne,
} from 'typeorm';
import {Field, ID, ObjectType} from '@nestjs/graphql';
import {NewSubcriptionInput} from '../resolvers/user/dto/subscription.input';
import moment from 'moment';
import { BaseModel } from '../models/base.model';
import { UserSubscription } from './subscriptions.entity';
import { User } from './user.entity';

@Entity({name: "ky9K7AxM_Following"})
@ObjectType()
export class Following extends BaseModel {
    @Field(type => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({default: 0})
    times_renewed: number;

    @Field()
    @Column({default: false})
    is_cancelled: boolean;

    @Field(type => UserSubscription)
    @ManyToOne(type => UserSubscription, subscription => subscription.following)
    subscriptions: UserSubscription;

    @Field(type => User)
    @ManyToOne(type => User, owner => owner.following)
    owner: User

}

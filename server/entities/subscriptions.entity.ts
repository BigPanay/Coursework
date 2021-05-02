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
import {User} from './user.entity';
import {Following} from './subscribed.entity';
import {NewSubcriptionInput} from '../resolvers/user/dto/subscription.input';
import moment from 'moment';
import { BaseModel } from '../models/base.model';

@Entity({name: 'ky9K7AxM_Subscription'})
@ObjectType()
export class UserSubscription extends BaseModel{
    @Field(type => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field(type => User)
    @ManyToOne(type => User, owner => owner.subscriptions)
    owner: User;

    @Field()
    @Column()
    price: number;

    @Field()
    @Column({default: 0})
    length: number;

    @Field()
    @Column()
    is_discounted: boolean;

    @Field()
    @Column()
    discounted_percentage: boolean;

    @Field()
    @Column({default: 0})
    discount_length: number;

    @Field()
    @Column({default: false})
    is_promoted: boolean;

    @Field(type => [Following])
    @OneToMany(type => Following, followers => followers)
    following: Following

    public async insertNewSubcriptions(subscription: NewSubcriptionInput) {
        this.name = subscription.name;
        this.price = subscription.price;
        this.is_discounted = subscription.isDiscounted;
        this.discounted_percentage = subscription.discountedPercentage;
        this.is_promoted = subscription.isPromoted;
    }
}

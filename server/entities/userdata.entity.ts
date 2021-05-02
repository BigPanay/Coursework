import {ObjectType, Field} from '@nestjs/graphql';
import {
    Column,
    Entity,
    PrimaryColumn,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import * as helper from '../helpers/index';
import { UserInfo } from './userInfo.entity';

@Entity({name: 'ky9K7AxM_UserData'})
@ObjectType()
export class UserData {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    device_id: string;

    @Field()
    @Column({name: "browser_identification"})
    browserId: string;

    @Field()
    @Column({name: "ip_address"})
    ipAddress: string;

    @Field()
    @Column({name: "last_login"})
    lastLogin: string;

    @Field()
    @Column({name: "last_active"})
    lastActive: string;


}

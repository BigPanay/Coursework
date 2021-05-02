import {IsString} from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthObject {

    @Field()
    public username: string;

    @Field()
    public user_id: string;

}
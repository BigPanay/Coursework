import {IsString} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RegisterUserInput {
    @Field()
    @IsString()
    public username: string;

    @Field()
    @IsString()
    public email: string;

    @Field()
    @IsString()
    public password: string;

    @Field()
    @IsString()
    public confirmPassword: string;
}

import {IsString} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginUserInput {
    @Field()
    @IsString()
    public email: string;

    @Field()
    @IsString()
    public password: string;

}

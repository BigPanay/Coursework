import {IsString, IsOptional, ValidationTypes, ValidatorOptions, Validator} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
    @Field()
    @IsString()
    id: string;

    @Field({nullable: true})
    displayName?: string;

    @Field({nullable: true})
    username?: string;

    @Field({nullable: true})
    profileDescription?: string;

    @Field({nullable: true})
    profilePicture?: string;

    @Field({nullable: true})
    email?: string;

    @Field({nullable: true})
    first_name?: string;

    @Field({nullable: true})
    last_name?: string;
    
    @Field({nullable: true})
    password?: string;

    @Field({nullable: true})
    newPassword?: string;

    @Field({nullable: true})
    confirmPassword?: string;
}

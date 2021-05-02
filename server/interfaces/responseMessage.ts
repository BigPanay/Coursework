import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ResponseMessage {
    @Field()
    status: string;

    @Field()
    info: string;

    @Field()
    access_token?: string;
}

import { Field, InputType } from "@nestjs/graphql";
import { IsString } from "class-validator";

@InputType()
export class NewMessageInput {

    @Field()
    @IsString()
    public message: string;

    @Field()
    @IsString()
    public senderId: string;

    @Field()
    @IsString()
    public recieverId: string;

    @Field()
    @IsString()
    public mediaUrls: string;

    @Field({nullable: true})
    conversationId?: string;

}
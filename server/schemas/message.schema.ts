import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field } from '@nestjs/graphql';
import { NewMessageInput } from '../resolvers/message/dto/newMessageInput.input';

export type MessageDocument = Message & Document;

@ObjectType()
@Schema()
export class Message {

    @Prop()
    @Field()
    message: string;

    @Prop()
    @Field()
    createdAt: Date;

    @Prop()
    @Field()
    mediaUrls: string;

    @Prop()
    @Field()
    senderId: string;

    @Prop({default: false})
    isDeleted: boolean;

    @Prop()
    @Field()
    conversationId: string;

    public async newMessage(newMessage: NewMessageInput) {
        this.createdAt      = new Date();
        this.message        = newMessage.message;
        this.mediaUrls      = newMessage.mediaUrls;
        this.senderId       = newMessage.senderId.toLowerCase();
    }
}

export const MessageSchema = SchemaFactory.createForClass(Message);
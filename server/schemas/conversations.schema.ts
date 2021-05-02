import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {Document, Types} from 'mongoose'
import {ObjectType, Field} from '@nestjs/graphql'
import {NewMessageInput} from '../resolvers/message/dto/newMessageInput.input'
import moment from 'moment'
import {Message} from './message.schema'
import {Log} from '../common/utils/logging/Log'

export type ConversationsDocument = Conversations & Document

@Schema()
@ObjectType()
export class Conversations {

    @Field()
    id: string;

    @Prop()
    @Field()
    dateCreated: Date

    @Prop()
    @Field(type => [String])
    users: String[]

    @Prop({default: false})
    deleted: Boolean

    @Prop({default: ''})
    @Field()
    readAt: string

    @Prop()
    @Field()
    lastMessageId: string

    @Field(type => [Message])
    messages: Message[];

    public async setNewConversation(message: NewMessageInput) {
        this.dateCreated    = new Date();
        this.users = []
        this.users.push(message.recieverId.toLowerCase())
        this.users.push(message.senderId.toLowerCase())
    }
}

export const ConversationsSchema = SchemaFactory.createForClass(Conversations)

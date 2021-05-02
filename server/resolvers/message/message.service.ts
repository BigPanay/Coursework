import {Injectable} from '@nestjs/common'
import {Model} from 'mongoose'
import {InjectModel} from '@nestjs/mongoose'
import {Conversations, ConversationsDocument} from '../../schemas/conversations.schema'
import {Message, MessageDocument} from '../../schemas/message.schema'
import {ResponseMessage} from '../../interfaces/responseMessage'
import {NewMessageInput} from './dto/newMessageInput.input'
import {Log} from '../../common/utils/logging/Log'

@Injectable()
export class MessageService{
    public constructor(
        @InjectModel(Conversations.name) private conversationModel: Model<ConversationsDocument>,
        @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    ) {}

    public async newMessage(newMessage: NewMessageInput): Promise<ResponseMessage> {
        let message = new Message()
        message.newMessage(newMessage)

        if (newMessage.conversationId != null) {
            message.conversationId = newMessage.conversationId
        } else {
            let conversation = await this.conversationModel.findOne({
                users: {$all: [newMessage.recieverId.toLowerCase(), newMessage.senderId.toLowerCase()]},
            })
            if (conversation == null) {
                let newConversation = new Conversations()
                newConversation.setNewConversation(newMessage)
                const createConversation = new this.conversationModel(newConversation)
                createConversation.save()
                message.conversationId = createConversation.id
            } else {
                message.conversationId = conversation.id
            }
        }

        const createMessage = new this.messageModel(message)
        createMessage.save()

        return Promise.resolve({status: 'Success', info: 'User created'})
    }

    public async getUserConversations(username: string): Promise<Conversations[]> {
        let conversations = await this.conversationModel
            .find({users: username.toLowerCase()})
            .sort({dateCreated: -1})
            .limit(10)

        for (let index = 0; index < conversations.length; index++) {
            let conversation = conversations[index];
            conversation.messages = [];
            await this.getUsersMessage(conversation.id).then(messages => {
                conversation.messages = messages;
            })
        }

        return conversations
    }

    private async getUsersMessage(conversationId: string): Promise<Message[]> {
        let messages = await this.messageModel
            .find({conversationId: conversationId})
            .sort({createdAt: -1})
            .limit(15)

        return messages
    }
}

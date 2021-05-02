import {Inject, UseInterceptors} from '@nestjs/common'
import {Args, Mutation, Resolver, Subscription, Query} from '@nestjs/graphql'
import {ResponseMessage} from '../../interfaces/responseMessage'
import {NewMessageInput} from './dto/newMessageInput.input'
import {PubSub} from 'graphql-subscriptions'
import {Message} from '../../schemas/message.schema'
import { Conversations } from '../../schemas/conversations.schema'
import { MessageService } from './message.service'

const pubSub = new PubSub()

@Resolver('Messages')
export class MessageResolver {
    constructor( private readonly messageService: MessageService) {}

    @Mutation(() => ResponseMessage)
    public async newMessage(
        @Args('newMessage') newMessage: NewMessageInput,
    ): Promise<ResponseMessage> {
        const message = await this.messageService.newMessage(newMessage)
        let testMessage = new Message()

        pubSub.publish('userNewMessage', {userNewMessage: testMessage})
        return message
    }

    @Query(() => [Conversations])
    // @UseGuards(LoginGuard)
    public async getUserConversations(@Args("username") username: string): Promise<Conversations[]> {
      return await this.messageService.getUserConversations(username);
    }

    
  

    @Subscription(returns => Message, {
        name: 'userNewMessage',
    })
    public async messageAdded() {
        return pubSub.asyncIterator('userNewMessage')
    }
}

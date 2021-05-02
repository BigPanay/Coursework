import { MiddlewareConsumer, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose';
import { MessageResolver } from './message.resolver'
import { MessageService } from './message.service'
import { Conversations, ConversationsSchema } from '../../schemas/conversations.schema';
import { Message, MessageSchema } from '../../schemas/message.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Conversations.name, schema: ConversationsSchema }, { name: Message.name, schema: MessageSchema }])],

    providers: [
        MessageResolver,
        MessageService
    ],
})
export class MessageModule {
    public configure(consumer: MiddlewareConsumer): void {
        consumer.apply().forRoutes(MessageResolver)
    }
}

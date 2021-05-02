import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import {Connection} from 'typeorm'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ormConfig } from './orm.config'
import { UserModule } from './resolvers/user/user.module';
import {MessageModule} from './resolvers/message/message.module'
import {MongooseModule} from '@nestjs/mongoose'

@Module({
  imports: [
    AuthModule, UserModule, MessageModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ormConfig,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/nest?retryWrites=true&w=majority', {
            useNewUrlParser: true,
        }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      debug: process.env.NODE_ENV == 'production' ? false : true,
      playground: process.env.NODE_ENV == 'production' ? false : true,
      installSubscriptionHandlers: true,
      context: ({ req, res }) => ({ req, res }),
      // schemaDirectives: {
      //     authHidden: UpperCaseDirective
      // }
    }),
  ],
  controllers: [
    AppController
  ],
  providers: [AppService],
})
export class AppModule implements NestModule { 
  public constructor(private readonly connection: Connection) {}
  configure(consumer: MiddlewareConsumer) {}
}

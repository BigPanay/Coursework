import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User } from '../../entities/user.entity';
import { UserSubscription } from '../../entities/subscriptions.entity';
import { Following } from '../../entities/subscribed.entity';
import { Like } from '../../entities/likes.entity';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserSubscription, Following, Like]), AuthModule],
  providers: [UserService, UserResolver]
})
export class UserModule {}

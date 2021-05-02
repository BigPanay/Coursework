import {ObjectType} from '@nestjs/graphql';
import {Following} from '../../entities/subscribed.entity';
import PaginatedResponse from '../../common/pagination/pagination';

@ObjectType()
export class SubscriptionConnection extends PaginatedResponse(Following) {}

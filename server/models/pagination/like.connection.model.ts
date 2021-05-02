import {ObjectType} from '@nestjs/graphql';
import {Like} from '../../entities/likes.entity';
import PaginatedResponse from '../../common/pagination/pagination';

@ObjectType()
export class LikeConnection extends PaginatedResponse(Like) {}

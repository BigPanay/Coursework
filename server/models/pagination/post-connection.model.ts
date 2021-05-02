import {ObjectType} from '@nestjs/graphql';
import {Post} from '../../entities/post.entity';
import PaginatedResponse from '../../common/pagination/pagination';

@ObjectType()
export class PostConnection extends PaginatedResponse(Post) {}

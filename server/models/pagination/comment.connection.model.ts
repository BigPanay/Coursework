import {ObjectType} from '@nestjs/graphql';
import PaginatedResponse from '../../common/pagination/pagination';
import { Comment } from '../../entities/comments.entity';

@ObjectType()
export class CommentConnection extends PaginatedResponse(Comment) {}

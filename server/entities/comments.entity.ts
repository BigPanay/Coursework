import {Column, Entity, ObjectIdColumn, PrimaryGeneratedColumn, PrimaryColumn, OneToMany, ManyToOne} from 'typeorm';
import { Post } from './post.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { User } from './user.entity';
// import { NewCommentInput } from 'server/resolvers/post/dto/newComment.input';
import moment from 'moment';
import * as helper from '../helpers/index';
import { BaseModel } from '..//models/base.model';
import { Like } from './likes.entity';

@Entity({name: 'ky9K7AxM_Comments'})
@ObjectType()
export class Comment extends BaseModel {

    @Field()
    @PrimaryColumn()
    id: string;

    @Field()
    @Column()
    comment: string;

    @Field()
    @Column()
    precise_time: string;

    @Field()
    @Column({default: 0})
    total_likes: number;

    @Field({defaultValue: false})
    viewer_has_liked: boolean;

    @Field()
    @Column({default: true})
    can_users_reply?: boolean;

    @Field(type => Post)
    @ManyToOne(type => Post, post => post.comment)
    post: Post;

    @Field(type => User)
    @ManyToOne(type => User, user => user.comments)
    owner: User;

    @Field(type => [Like])
    @OneToMany(type => Like, like => like.comment)
    likes: Like[];

    // public async setNewComment(newComment: NewCommentInput) {
    //     this.id                 = helper.randomId(19);
    //     this.comment            = newComment.comment;    }


}
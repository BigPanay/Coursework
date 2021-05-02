import {
    Column,
    Entity,
    ObjectIdColumn,
    PrimaryGeneratedColumn,
    PrimaryColumn,
    OneToMany,
    ManyToOne,
} from 'typeorm';
import {Post} from './post.entity';
import {Comment} from './comments.entity';
import {Field, ObjectType} from '@nestjs/graphql';
import {User} from './user.entity';

@Entity({name: 'ky9K7AxM_Likes'})
@ObjectType()
export class Like {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({default: false})
    is_comment: boolean;

    @Field(type => Comment)
    @ManyToOne(type => Comment, comment => comment.likes)
    comment: Comment;

    @Field(type => User)
    @ManyToOne(type => User, owner => owner.likes)
    owner: User;

    @Field(type => Post)
    @ManyToOne(type => Post, post => post.post_likes)
    post: Post;
}

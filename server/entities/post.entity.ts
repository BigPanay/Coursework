import {
    Column,
    Entity,
    ObjectIdColumn,
    PrimaryGeneratedColumn,
    PrimaryColumn,
    OneToMany,
    ManyToOne,
} from 'typeorm';
import {Comment} from './comments.entity';
import {Like} from './likes.entity';
import {ObjectType, Field} from '@nestjs/graphql';
// import {NewUserPostInput} from '../resolvers/post/dto/newPost.input';
import {User} from './user.entity';
import {Media} from './media.entity';
import moment from 'moment';
import * as helper from '../helpers/index';
import {BaseModel} from '../models/base.model';
import {CommentConnection} from '../models/pagination/comment.connection.model';

@Entity({name: 'ky9K7AxM_Posts'})
@ObjectType()
export class Post extends BaseModel {
    @Field()
    @PrimaryColumn()
    id: string;

    @Field()
    @Column({default: null})
    url: string;

    @Field()
    @Column()
    post_description: string;

    @Field()
    @Column()
    is_free: boolean;

    @Field()
    @Column({name: 'explore_page'})
    canBeViewedInExplorePage: boolean;

    @Field()
    @Column({default: false})
    is_deleted?: boolean;

    @Field()
    @Column({default: null})
    time_deleted?: string;

    @Field()
    @Column({default: false})
    can_comment: boolean;

    @Field()
    @Column({default: false})
    is_pinned: boolean;

    @Field(type => [Media])
    @OneToMany(type => Media, medias => medias.post, {
        cascade: true,
    })
    medias: Media[];

    @Field(type => [Comment])
    @OneToMany(type => Comment, comment => comment.post, {cascade: true})
    comment: Comment[];

    @Field(type => CommentConnection, {nullable: true})
    edge_comment: CommentConnection;

    @Field(type => CommentConnection, {nullable: true})
    edge_preview_comment: CommentConnection;

    @Field(type => [Like])
    @OneToMany(type => Like, like => like.post, {cascade: true})
    post_likes: Like[];

    @Field()
    @Column({default: 0})
    total_comments: number;

    @Field()
    @Column({default: 0})
    total_likes: number;

    @Field()
    @Column({default: true})
    viewers_can_reshare: boolean;

    @Field(type => User)
    @ManyToOne(type => User, owner => owner.posts)
    owner: User;

    @Field({defaultValue: false})
    viewer_has_liked: boolean;

    @Field({defaultValue: false})
    viewer_has_favourited: boolean;

    // public async setPostEntityByNewUserPostInput(
    //     newUserPostInput: NewUserPostInput,
    // ): Promise<void> {
    //     this.id = helper.randomId(15);
    //     this.post_description = newUserPostInput.postDescription;
    //     this.can_comment = newUserPostInput.canComment;
    //     this.is_free = newUserPostInput.isFree;
    //     this.medias = [];
    //     // this.created_at = new Date();

    //     if (newUserPostInput.media != null) {
    //         newUserPostInput.media.forEach(media => {
    //             let userMedia: Media = new Media();
    //             userMedia.setNewMedia(media);

    //             this.medias.push(userMedia);
    //         });
    //     }
    // }
}

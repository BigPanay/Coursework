import {Column, Entity, ObjectIdColumn, PrimaryGeneratedColumn, PrimaryColumn, OneToMany, OneToOne, ManyToOne} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Post } from './post.entity';
// import { MediaObject } from '../resolvers/post/model/media.model';

@Entity({ name: 'ky9K7AxM_Media' })
@ObjectType()
export class Media {

    @Field(type => ID)
    @PrimaryGeneratedColumn()
    id?: number;

    @Field()
    @Column()
    media_url: string;

    @Field()
    @Column()
    is_media_video: boolean;

    @Field()
    @Column()
    width: number;

    @Field()
    @Column()
    height: number;

    @Field()
    @Column()
    is_locked: boolean;

    @Field(type => Post)
    @ManyToOne(type => Post, post => post.edge_comment)
    post?: Post;

    // public async setNewMedia(media: MediaObject): Promise<void> {
    //     this.height         = media.height;
    //     this.width          = media.width;
    //     this.is_locked      = media.isLocked;
    //     this.is_media_video = media.isMediaVideo;
    //     this.media_url      = media.mediaUrl;
    // }
}

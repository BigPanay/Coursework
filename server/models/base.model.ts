import {Field, ObjectType, ID} from '@nestjs/graphql';
import moment from 'moment';
import {Column, PrimaryColumn} from 'typeorm';

@ObjectType({isAbstract: true})
export abstract class BaseModel {
    constructor() {
        this.created_at = new Date();
        this.updated_at = new Date();
        this.precise_time = Date.now().toPrecision()
    }

    @Field(type => ID)
    id: string | number;

    @Field({
        description: 'Identifies the date and time when the object was created.',
    })
    @Column()
    created_at: Date;

    @Field({
        description: 'Identifies the date and time when the object was last updated.',
        nullable: true,
    })
    @Column({type: 'timestamp'})
    updated_at: Date;

    @Field({
        description: 'Identifies the precise time the object was created',
        nullable: true,
    })
    @Column()
    precise_time: string;
}

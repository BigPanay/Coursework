import {Field, ObjectType, Int} from '@nestjs/graphql';
import {Type} from '@nestjs/common';
import { PageInfo } from './page-info.model';

export default function Paginated<TItem>(TItemClass: Type<TItem>) {
    @ObjectType(`${TItemClass.name}Edge`)
    abstract class EdgeType {
        @Field(type => String, {nullable: true})
        cursor?: string;

        @Field(type => TItemClass)
        node: TItem;
    }

    @ObjectType({isAbstract: true})
    abstract class PaginatedType {
        @Field(type => [EdgeType], {nullable: true})
        edges: Array<EdgeType>;

        @Field((type) => PageInfo)
        pageInfo: PageInfo;

        @Field(type => Int)
        totalCount: number;
    }

    return PaginatedType;
}

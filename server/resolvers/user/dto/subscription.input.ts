import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class NewSubcriptionInput {

    @Field()
    name: string;

    @Field()
    ownerId: string;

    @Field()
    price: number;

    @Field()
    isDiscounted: boolean;

    @Field()
    discountedPercentage: boolean;

    @Field()
    discountLength: number;

    @Field()
    isPromoted: boolean;
}
import {Field, InputType, registerEnumType} from '@nestjs/graphql';
import {Order} from '../../../models/order/order';

export enum UserOrderField {
    id = 'id',
    createdAt = 'created_at',
    updatedAt = 'updated_at',
}

registerEnumType(UserOrderField, {
    name: 'UserOrderField',
    description: 'Properties by which post connections can be ordered.',
});

@InputType()
export class UserOrder extends Order {
    @Field(type => UserOrderField)
    field: UserOrderField;
}

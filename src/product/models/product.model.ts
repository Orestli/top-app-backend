import { Field, ObjectType } from "@nestjs/graphql";
import { prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Types } from "mongoose";

@ObjectType()
class ProductCharacteristics {
  @Field(() => String)
  @prop()
  name: string;

  @Field(() => String)
  @prop()
  value: string;
}

// eslint-disable-next-line
export interface ProductModel extends Base {}

@ObjectType()
export class ProductModel extends TimeStamps {
  @Field(() => String)
  _id: Types.ObjectId;

  @Field(() => String)
  @prop()
  image: string;

  @Field(() => String)
  @prop()
  title: string;

  @Field(() => Number)
  @prop()
  price: number;

  @Field(() => Number, { nullable: true })
  @prop()
  oldPrice?: number;

  @Field(() => Number)
  @prop()
  credit: number;

  @Field(() => String)
  @prop()
  description: string;

  @Field(() => String)
  @prop()
  advantages: string;

  @Field(() => String)
  @prop()
  disAdvantages: string;

  @Field(() => [String])
  @prop({ type: () => [String] })
  categories: string[];

  @Field(() => [String])
  @prop({ type: () => [String] })
  tags: string[];

  @Field(() => [ProductCharacteristics])
  @prop({ type: () => [ProductCharacteristics], _id: false })
  characteristics: ProductCharacteristics[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

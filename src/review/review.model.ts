import { Field, ObjectType } from "@nestjs/graphql";
import { prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Types } from "mongoose";

// eslint-disable-next-line
export interface ReviewModel extends Base {}

@ObjectType()
export class ReviewModel extends TimeStamps {
  @Field(() => String)
  _id: Types.ObjectId;

  @Field(() => String)
  @prop()
  name: string;

  @Field(() => String)
  @prop()
  title: string;

  @Field(() => String)
  @prop()
  description: string;

  @Field(() => Number)
  @prop()
  rating: number;

  @Field(() => String)
  @prop()
  productId: Types.ObjectId;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

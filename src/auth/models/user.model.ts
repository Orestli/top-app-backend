import { Field, ObjectType } from "@nestjs/graphql";
import { prop } from "@typegoose/typegoose";
import { TimeStamps, Base } from "@typegoose/typegoose/lib/defaultClasses";
import { Types } from "mongoose";

// eslint-disable-next-line
export interface UserModel extends Base {}

@ObjectType()
export class UserModel extends TimeStamps {
  @Field(() => String)
  _id: Types.ObjectId;

  @prop({ unique: true })
  @Field(() => String)
  email: string;

  @prop()
  @Field(() => String)
  passwordHash: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

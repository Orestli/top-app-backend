import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { index, prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Types } from "mongoose";

export enum PageLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}

registerEnumType(PageLevelCategory, { name: "topLevelCategory" });

@ObjectType()
class HhData {
  @Field(() => Number)
  @prop()
  count: number;

  @Field(() => Number)
  @prop()
  juniorSalary: number;

  @Field(() => Number)
  @prop()
  middleSalary: number;

  @Field(() => Number)
  @prop()
  seniorSalary: number;
}

@ObjectType()
class PageAdvantage {
  @Field(() => String)
  @prop()
  title: string;

  @Field(() => String)
  @prop()
  description: string;
}

// eslint-disable-next-line
export interface PageModel extends Base {}

@ObjectType()
@index({ "$**": "text" })
export class PageModel extends TimeStamps {
  @Field(() => String)
  _id: Types.ObjectId;

  @Field(() => PageLevelCategory)
  @prop({ enum: PageLevelCategory })
  firstCategory: PageLevelCategory;

  @Field(() => String)
  @prop()
  secondCategory: string;

  @Field(() => String)
  @prop({ unique: true })
  alias: string;

  @Field(() => String)
  @prop()
  title: string;

  @Field(() => String)
  @prop()
  category: string;

  @Field(() => HhData, { nullable: true })
  @prop({ type: () => HhData })
  hh?: HhData;

  @Field(() => [PageAdvantage])
  @prop({ type: () => [PageAdvantage] })
  advantages: PageAdvantage[];

  @Field(() => String)
  @prop()
  seoText: string;

  @Field(() => String)
  @prop()
  tagsTitle: string;

  @Field(() => [String])
  @prop({ type: () => [String] })
  tags: string[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

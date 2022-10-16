import { Field, InputType } from "@nestjs/graphql";
import { IsEnum } from "class-validator";

import { PageLevelCategory } from "../models/page.model";

@InputType()
export class FindPageInput {
  @Field(() => PageLevelCategory)
  @IsEnum(PageLevelCategory)
  firstCategory: PageLevelCategory;
}

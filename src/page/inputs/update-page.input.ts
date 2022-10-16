import { Field, InputType } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

import { PageLevelCategory } from "../models/page.model";

@InputType()
class UpdateHhDataDto {
  @Field(() => Number, { nullable: true })
  @IsNumber()
  count: number;

  @Field(() => Number, { nullable: true })
  @IsNumber()
  juniorSalary: number;

  @Field(() => Number, { nullable: true })
  @IsNumber()
  middleSalary: number;

  @Field(() => Number, { nullable: true })
  @IsNumber()
  seniorSalary: number;
}

@InputType()
class UpdateTopPageAdvantageDto {
  @Field(() => String, { nullable: true })
  @IsString()
  title: string;

  @Field(() => String, { nullable: true })
  @IsString()
  description: string;
}

@InputType()
export class UpdatePageInput {
  @Field(() => PageLevelCategory, { nullable: true })
  @IsEnum(PageLevelCategory)
  firstCategory: PageLevelCategory;

  @Field(() => String, { nullable: true })
  @IsString()
  secondCategory: string;

  @Field(() => String, { nullable: true })
  @IsString()
  alias: string;

  @Field(() => String, { nullable: true })
  @IsString()
  title: string;

  @Field(() => String, { nullable: true })
  @IsString()
  category: string;

  @Field(() => UpdateHhDataDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateHhDataDto)
  hh?: UpdateHhDataDto;

  @Field(() => [UpdateTopPageAdvantageDto], { nullable: true })
  @IsArray()
  @ValidateNested()
  @Type(() => UpdateTopPageAdvantageDto)
  advantages: UpdateTopPageAdvantageDto[];

  @Field(() => String, { nullable: true })
  @IsString()
  seoText: string;

  @Field(() => String, { nullable: true })
  @IsString()
  tagsTitle: string;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsString({ each: true })
  tags: string[];
}

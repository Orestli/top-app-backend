import { Field, InputType } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

import { PageLevelCategory } from "../models/page.model";

@InputType()
class CreateHhDataDto {
  @Field(() => Number)
  @IsNumber()
  count: number;

  @Field(() => Number)
  @IsNumber()
  juniorSalary: number;

  @Field(() => Number)
  @IsNumber()
  middleSalary: number;

  @Field(() => Number)
  @IsNumber()
  seniorSalary: number;
}

@InputType()
class CreateTopPageAdvantageDto {
  @Field(() => String)
  @IsString()
  title: string;

  @Field(() => String)
  @IsString()
  description: string;
}

@InputType()
export class CreatePageInput {
  @Field(() => PageLevelCategory)
  @IsEnum(PageLevelCategory)
  firstCategory: PageLevelCategory;

  @Field(() => String)
  @IsString()
  secondCategory: string;

  @Field(() => String)
  @IsString()
  alias: string;

  @Field(() => String)
  @IsString()
  title: string;

  @Field(() => String)
  @IsString()
  category: string;

  @Field(() => CreateHhDataDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateHhDataDto)
  hh?: CreateHhDataDto;

  @Field(() => [CreateTopPageAdvantageDto])
  @IsArray()
  @ValidateNested()
  @Type(() => CreateTopPageAdvantageDto)
  advantages: CreateTopPageAdvantageDto[];

  @Field(() => String)
  @IsString()
  seoText: string;

  @Field(() => String)
  @IsString()
  tagsTitle: string;

  @Field(() => [String])
  @IsArray()
  @IsString({ each: true })
  tags: string[];
}

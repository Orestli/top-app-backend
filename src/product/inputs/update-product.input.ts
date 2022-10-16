import { Field, InputType } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

@InputType()
class UpdateProductCharacteristicsInput {
  @Field(() => String, { nullable: true })
  @IsString()
  name?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  value?: string;
}

@InputType()
export class UpdateProductInput {
  @Field(() => String, { nullable: true })
  @IsString()
  image?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  title?: string;

  @Field(() => Number, { nullable: true })
  @IsNumber()
  price?: number;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsNumber()
  oldPrice?: number;

  @Field(() => Number, { nullable: true })
  @IsNumber()
  credit?: number;

  @Field(() => String, { nullable: true })
  @IsString()
  description?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  advantages?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  disAdvantages?: string;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsString({ each: true })
  categories?: string[];

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @Field(() => [UpdateProductCharacteristicsInput], { nullable: true })
  @IsArray()
  @ValidateNested()
  @Type(() => UpdateProductCharacteristicsInput)
  characteristics?: UpdateProductCharacteristicsInput[];
}

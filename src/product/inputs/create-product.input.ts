import { Field, InputType } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

@InputType()
class CreateProductCharacteristicsInput {
  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => String)
  @IsString()
  value: string;
}

@InputType()
export class CreateProductInput {
  @Field(() => String)
  @IsString()
  image: string;

  @Field(() => String)
  @IsString()
  title: string;

  @Field(() => Number)
  @IsNumber()
  price: number;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsNumber()
  oldPrice?: number;

  @Field(() => Number)
  @IsNumber()
  credit: number;

  @Field(() => String)
  @IsString()
  description: string;

  @Field(() => String)
  @IsString()
  advantages: string;

  @Field(() => String)
  @IsString()
  disAdvantages: string;

  @Field(() => [String])
  @IsArray()
  @IsString({ each: true })
  categories: string[];

  @Field(() => [String])
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @Field(() => [CreateProductCharacteristicsInput])
  @IsArray()
  @ValidateNested()
  @Type(() => CreateProductCharacteristicsInput)
  characteristics: CreateProductCharacteristicsInput[];
}

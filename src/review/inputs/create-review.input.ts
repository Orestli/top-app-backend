import { Field, InputType } from "@nestjs/graphql";
import { IsNumber, IsString, Max, Min } from "class-validator";

@InputType()
export class CreateReviewInput {
  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => String)
  @IsString()
  title: string;

  @Field(() => String)
  @IsString()
  description: string;

  @Field(() => Number)
  @Max(5)
  @Min(1, { message: "Rating cannot be less than 1" })
  @IsNumber()
  rating: number;

  @Field(() => String)
  @IsString()
  productId: string;
}

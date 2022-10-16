import { Field, InputType } from "@nestjs/graphql";
import { IsNumber, IsString } from "class-validator";

@InputType()
export class FindProductInput {
  @Field(() => String)
  @IsString()
  category: string;

  @Field(() => Number)
  @IsNumber()
  limit: number;
}

import { Field, InputType } from "@nestjs/graphql";
import { IsString } from "class-validator";

@InputType()
export class AuthInput {
  @Field(() => String)
  @IsString()
  login: string;

  @Field(() => String)
  @IsString()
  password: string;
}

import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class LoginModel {
  @Field(() => String)
  access_token: string;
}

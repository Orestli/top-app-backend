import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class FileElementResponse {
  @Field(() => String)
  url: string;

  @Field(() => String)
  name: string;
}

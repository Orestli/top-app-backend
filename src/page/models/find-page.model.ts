import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
class PageCategory {
  @Field(() => String)
  secondCategory: string;
}

@ObjectType()
class Page {
  @Field(() => String)
  title: string;

  @Field(() => String)
  alias: string;
}

@ObjectType()
export class FindPageModel {
  @Field(() => PageCategory)
  _id: PageCategory;

  @Field(() => [Page])
  pages: Page[];
}

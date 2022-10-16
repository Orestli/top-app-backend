import { Field, ObjectType } from "@nestjs/graphql";

import { ReviewModel } from "../../review/review.model";

@ObjectType()
export class FindProductModel extends ReviewModel {
  @Field(() => [ReviewModel])
  reviews: ReviewModel[];

  @Field(() => Number)
  reviewCount: number;

  @Field(() => Number, { nullable: true })
  reviewAvg: number;
}

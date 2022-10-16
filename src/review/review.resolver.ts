import { HttpException, HttpStatus, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { IdValidationPipe } from "../pipes/id-validation.pipe";
import { TelegramService } from "../telegram/telegram.service";

import { CreateReviewInput } from "./inputs/create-review.input";
import { REVIEW_NOT_FOUND } from "./review.constants";
import { ReviewModel } from "./review.model";
import { ReviewService } from "./review.service";

@Resolver("review")
export class ReviewResolver {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly telegramService: TelegramService
  ) {}

  @UsePipes(new ValidationPipe())
  @Mutation(() => ReviewModel)
  async addReview(@Args("input") reviewArgs: CreateReviewInput) {
    const review = await this.reviewService.create(reviewArgs);

    const message =
      `Name: ${reviewArgs.name}\n` +
      `Title: ${reviewArgs.title}\n` +
      `Description: ${reviewArgs.description}\n` +
      `Rating: ${reviewArgs.rating}\n` +
      `Id: ${reviewArgs.productId}`;
    await this.telegramService.sendMessage(message);

    return review;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ReviewModel)
  async deleteReview(@Args("reviewId", IdValidationPipe) id: string) {
    const deletedDoc = await this.reviewService.delete(id);

    if (!deletedDoc) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return deletedDoc;
  }

  @Query(() => [ReviewModel])
  async findReviewsProductById(@Args("productId") productId: string) {
    return await this.reviewService.findReviewsByProductId(productId);
  }
}

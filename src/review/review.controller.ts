import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { IdValidationPipe } from "../pipes/id-validation.pipe";
import { TelegramService } from "../telegram/telegram.service";

import { CreateReviewInput } from "./inputs/create-review.input";
import { REVIEW_NOT_FOUND } from "./review.constants";
import { ReviewService } from "./review.service";

@Controller("review")
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly telegramService: TelegramService
  ) {}

  @UsePipes(new ValidationPipe())
  @Post("create")
  async create(@Body() dto: CreateReviewInput) {
    return await this.reviewService.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @Post("notify")
  async notify(@Body() dto: CreateReviewInput) {
    const message =
      `Name: ${dto.name}\n` +
      `Title: ${dto.title}\n` +
      `Description: ${dto.description}\n` +
      `Rating: ${dto.rating}\n` +
      `Id: ${dto.productId}`;

    return await this.telegramService.sendMessage(message);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async delete(@Param("id", IdValidationPipe) id: string) {
    const deletedDoc = await this.reviewService.delete(id);

    if (!deletedDoc) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return deletedDoc;
  }

  @Get("byProduct/:productId")
  async getByProduct(@Param("productId") productId: string) {
    return await this.reviewService.findReviewsByProductId(productId);
  }
}

import { Injectable } from "@nestjs/common";
import { ModelType, DocumentType } from "@typegoose/typegoose/lib/types";
import { Types } from "mongoose";
import { InjectModel } from "nestjs-typegoose";

import { CreateReviewInput } from "./inputs/create-review.input";
import { ReviewModel } from "./review.model";

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(ReviewModel)
    private readonly reviewModel: ModelType<ReviewModel>
  ) {}

  async create(dto: CreateReviewInput): Promise<DocumentType<ReviewModel>> {
    return await this.reviewModel.create(dto);
  }

  async delete(id: string): Promise<DocumentType<ReviewModel> | null> {
    return await this.reviewModel.findByIdAndDelete(id).exec();
  }

  async findReviewsByProductId(productId: string): Promise<DocumentType<ReviewModel>[]> {
    return this.reviewModel
      .find({
        productId: new Types.ObjectId(productId),
      })
      .exec();
  }

  async deleteByProductId(productId: string) {
    return await this.reviewModel
      .deleteMany({
        productId: new Types.ObjectId(productId),
      })
      .exec();
  }
}

import { Injectable } from "@nestjs/common";
import { DocumentType, ModelType } from "@typegoose/typegoose/lib/types";
import { InjectModel } from "nestjs-typegoose";

import { ReviewModel } from "../review/review.model";

import { CreateProductInput } from "./inputs/create-product.input";
import { FindProductInput } from "./inputs/find-product.input";
import { UpdateProductInput } from "./inputs/update-product.input";
import { ProductModel } from "./models/product.model";

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductModel)
    private readonly productModel: ModelType<ProductModel>
  ) {}

  async create(dto: CreateProductInput): Promise<DocumentType<ProductModel>> {
    return this.productModel.create(dto);
  }

  async findById(id: string): Promise<DocumentType<ProductModel>> {
    return this.productModel.findById(id).exec();
  }

  async deleteById(id: string): Promise<DocumentType<ProductModel> | null> {
    return await this.productModel.findByIdAndDelete(id).exec();
  }

  async updateById(id: string, dto: UpdateProductInput): Promise<DocumentType<ProductModel>> {
    return await this.productModel
      .findByIdAndUpdate(id, dto, {
        new: true,
      })
      .exec();
  }

  async findWithReviews(dto: FindProductInput) {
    return (await this.productModel
      .aggregate([
        {
          $match: {
            categories: dto.category,
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
        {
          $limit: dto.limit,
        },
        {
          $lookup: {
            from: "Review",
            localField: "_id",
            foreignField: "productId",
            as: "reviews",
          },
        },
        {
          $addFields: {
            reviewCount: { $size: "$reviews" },
            reviewAvg: { $avg: "$reviews.rating" },
            reviews: {
              $function: {
                body: `function (reviews) {
                  reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                  return reviews;
                }`,
                args: ["$reviews"],
                lang: "js",
              },
            },
          },
        },
      ])
      .exec()) as (ProductModel & {
      reviews: ReviewModel[];
      reviewCount: number;
      reviewAvg: number;
    })[];
  }
}

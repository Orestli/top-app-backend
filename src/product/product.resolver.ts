import { HttpCode, NotFoundException, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { IdValidationPipe } from "../pipes/id-validation.pipe";

import { CreateProductInput } from "./inputs/create-product.input";
import { FindProductInput } from "./inputs/find-product.input";
import { UpdateProductInput } from "./inputs/update-product.input";
import { FindProductModel } from "./models/find-product.model";
import { ProductModel } from "./models/product.model";
import { PRODUCT_NOT_FOUND_ERROR } from "./product.constants";
import { ProductService } from "./product.service";

@Resolver("product")
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ProductModel)
  async createProduct(@Args("input") productArgs: CreateProductInput) {
    return await this.productService.create(productArgs);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => ProductModel)
  async getProduct(@Args("productId", IdValidationPipe) id: string) {
    const product = await this.productService.findById(id);

    if (!product) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
    }

    return product;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ProductModel)
  async deleteProduct(@Args("productId", IdValidationPipe) id: string) {
    const deletedProduct = await this.productService.deleteById(id);

    if (!deletedProduct) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
    }

    return deletedProduct;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ProductModel)
  async updateProduct(
    @Args("productId", IdValidationPipe) id: string,
    @Args("input") productArgs: UpdateProductInput
  ) {
    const updatedProduct = await this.productService.updateById(id, productArgs);

    if (!updatedProduct) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
    }

    return updatedProduct;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Mutation(() => [FindProductModel])
  async findProducts(@Args("input") productArgs: FindProductInput) {
    return await this.productService.findWithReviews(productArgs);
  }
}

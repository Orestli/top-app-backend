import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";

import { ProductModel } from "./models/product.model";
import { ProductController } from "./product.controller";
import { ProductResolver } from "./product.resolver";
import { ProductService } from "./product.service";

@Module({
  controllers: [ProductController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: ProductModel,
        schemaOptions: {
          collection: "Product",
        },
      },
    ]),
  ],
  providers: [ProductService, ProductResolver],
})
export class ProductModule {}

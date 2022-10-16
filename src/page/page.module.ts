import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";

import { PageModel } from "./models/page.model";
import { PageController } from "./page.controller";
import { PageResolver } from "./page.resolver";
import { PageService } from "./page.service";

@Module({
  controllers: [PageController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: PageModel,
        schemaOptions: {
          collection: "TopPage",
        },
      },
    ]),
  ],
  providers: [PageService, PageResolver],
})
export class PageModule {}

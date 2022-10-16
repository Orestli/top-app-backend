import { Injectable } from "@nestjs/common";
import { DocumentType, ModelType } from "@typegoose/typegoose/lib/types";
import { InjectModel } from "nestjs-typegoose";

import { CreatePageInput } from "./inputs/create-page.input";
import { PageLevelCategory, PageModel } from "./models/page.model";

@Injectable()
export class PageService {
  constructor(
    @InjectModel(PageModel)
    private readonly topPageModel: ModelType<PageModel>
  ) {}

  async create(dto: CreatePageInput): Promise<DocumentType<PageModel>> {
    return await this.topPageModel.create(dto);
  }

  async findById(id: string): Promise<DocumentType<PageModel>> {
    return await this.topPageModel.findById(id).exec();
  }

  async findByAlias(alias: string): Promise<DocumentType<PageModel>> {
    return await this.topPageModel.findOne({ alias }).exec();
  }

  async findByCategory(firstCategory: PageLevelCategory) {
    return await this.topPageModel
      .aggregate()
      .match({
        firstCategory,
      })
      .group({
        _id: { secondCategory: "$secondCategory" },
        pages: { $push: { alias: "$alias", title: "$title" } },
      })
      .exec();
  }

  async findByText(text: string) {
    return await this.topPageModel
      .find({
        $text: {
          $search: text,
          $caseSensitive: false,
        },
      })
      .exec();
  }

  async deleteById(id: string) {
    return await this.topPageModel.findByIdAndRemove(id).exec();
  }

  async updateById(id: string, dto: CreatePageInput) {
    return await this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }
}

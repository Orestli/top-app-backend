import { HttpCode, NotFoundException, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { IdValidationPipe } from "../pipes/id-validation.pipe";

import { CreatePageInput } from "./inputs/create-page.input";
import { FindPageInput } from "./inputs/find-page.input";
import { UpdatePageInput } from "./inputs/update-page.input";
import { FindPageModel } from "./models/find-page.model";
import { PageModel } from "./models/page.model";
import { NOT_FOUND_TOP_PAGE_ERROR } from "./page.constants";
import { PageService } from "./page.service";

@Resolver("page")
export class PageResolver {
  constructor(private readonly topPageService: PageService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => PageModel)
  async createPage(@Args("input") pageArs: CreatePageInput) {
    return await this.topPageService.create(pageArs);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => PageModel)
  async getPage(@Args("pageId", IdValidationPipe) id: string) {
    const page = await this.topPageService.findById(id);

    if (!page) {
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
    }

    return page;
  }

  @Query(() => PageModel)
  async getPageByAlias(@Args("alias") alias: string) {
    const page = await this.topPageService.findByAlias(alias);

    if (!page) {
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
    }

    return page;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => PageModel)
  async deletePage(@Args("pageId", IdValidationPipe) id: string) {
    const page = await this.topPageService.deleteById(id);

    if (!page) {
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
    }

    return page;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => PageModel)
  async updatePage(
    @Args("pageId", IdValidationPipe) id: string,
    @Args("input") pageArgs: UpdatePageInput
  ) {
    const updatedPage = await this.topPageService.updateById(id, pageArgs);

    if (!updatedPage) {
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
    }

    return updatedPage;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Mutation(() => FindPageModel, { nullable: true })
  async findPageByCategory(@Args("input") pageArgs: FindPageInput) {
    return await this.topPageService.findByCategory(pageArgs.firstCategory);
  }

  @Query(() => [PageModel])
  async findPageByQuery(@Args("query") text: string) {
    return await this.topPageService.findByText(text);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { IdValidationPipe } from "../pipes/id-validation.pipe";

import { CreatePageInput } from "./inputs/create-page.input";
import { FindPageInput } from "./inputs/find-page.input";
import { NOT_FOUND_TOP_PAGE_ERROR } from "./page.constants";
import { PageService } from "./page.service";

@Controller("top-page")
export class PageController {
  constructor(private readonly topPageService: PageService) {}

  @UseGuards(JwtAuthGuard)
  @Post("create")
  async create(@Body() dto: CreatePageInput) {
    return await this.topPageService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  async get(@Param("id", IdValidationPipe) id: string) {
    const page = await this.topPageService.findById(id);

    if (!page) {
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
    }

    return page;
  }

  @Get("byAlias/:alias")
  async getByAlias(@Param("alias") alias: string) {
    const page = await this.topPageService.findByAlias(alias);

    if (!page) {
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
    }

    return page;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async delete(@Param("id", IdValidationPipe) id: string) {
    const page = await this.topPageService.deleteById(id);

    if (!page) {
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async patch(@Param("id", IdValidationPipe) id: string, @Body() dto: CreatePageInput) {
    const updatedPage = await this.topPageService.updateById(id, dto);

    if (!updatedPage) {
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
    }

    return updatedPage;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post("find")
  async find(@Body() dto: FindPageInput) {
    return await this.topPageService.findByCategory(dto.firstCategory);
  }

  @Get("textSearch/:text")
  async textSearch(@Param("text") text: string) {
    return await this.topPageService.findByText(text);
  }
}

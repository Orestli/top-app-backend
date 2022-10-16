import { HttpCode, UseGuards, UseInterceptors } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { FileInterceptor } from "@nestjs/platform-express";
import { GraphQLUpload } from "graphql-upload";

import { JwtAuthGuard } from "../auth/guards/jwt.guard";

import { FilesService } from "./files.service";
import { FileElementResponse } from "./inputs/file-element.response";
import { MFile } from "./mfile.class";

@Resolver("upload")
export class FilesResolver {
  constructor(private readonly filesService: FilesService) {}

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor("files"))
  @Mutation(() => [FileElementResponse])
  async uploadFile(
    @Args("file", { type: () => GraphQLUpload }) file: Express.Multer.File
  ): Promise<FileElementResponse[]> {
    const saveArray: MFile[] = [new MFile(file)];

    if (file.mimetype.includes("image")) {
      const buffer = await this.filesService.convertToWebP(file.buffer);

      saveArray.push(
        new MFile({
          originalname: `${file.originalname.split(".")[0]}.webp`,
          buffer,
        })
      );
    }

    return await this.filesService.saveFiles(saveArray);
  }
}

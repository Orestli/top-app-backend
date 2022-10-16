import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { path } from "app-root-path";

import { FilesController } from "./files.controller";
import { FilesResolver } from "./files.resolver";
import { FilesService } from "./files.service";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
      serveRoot: "/static",
    }),
  ],
  controllers: [FilesController],
  providers: [FilesService, FilesResolver],
})
export class FilesModule {}

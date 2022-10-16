import { DynamicModule, Global, Module, Provider } from "@nestjs/common";

import { TELEGRAM_MODULE_OPTIONS } from "./telegram.constants";
import { TelegramModuleAsyncOptions } from "./telegram.interface";
import { TelegramService } from "./telegram.service";

@Global()
@Module({})
export class TelegramModule {
  static forRootAsync(options: TelegramModuleAsyncOptions): DynamicModule {
    const asyncOptions = this.createAsyncOptionsProvider(options);

    return {
      module: TelegramModule,
      imports: options.imports,
      providers: [TelegramService, asyncOptions],
      exports: [TelegramService],
    };
  }

  private static createAsyncOptionsProvider(options: TelegramModuleAsyncOptions): Provider {
    return {
      provide: TELEGRAM_MODULE_OPTIONS,
      useFactory: async (...args: any[]) => {
        return options.useFactory(...args);
      },
      inject: options.inject || [],
    };
  }
}

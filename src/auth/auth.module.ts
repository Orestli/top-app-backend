import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypegooseModule } from "nestjs-typegoose";

import { getJWTConfig } from "../configs/jwt.config";

import { AuthController } from "./auth.controller";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { UserModel } from "./models/user.model";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { UserService } from "./user.service";

@Module({
  controllers: [AuthController],
  imports: [
    ConfigModule,
    TypegooseModule.forFeature([
      {
        typegooseClass: UserModel,
        schemaOptions: {
          collection: "User",
        },
      },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
    PassportModule,
  ],
  providers: [AuthService, UserService, AuthResolver, JwtStrategy],
})
export class AuthModule {}

import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

import { ALREADY_REGISTERED_ERROR } from "./auth.constants";
import { AuthService } from "./auth.service";
import { AuthInput } from "./inputs/auth.input";
import { UserService } from "./user.service";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @UsePipes(new ValidationPipe())
  @Post("register")
  async register(@Body() dto: AuthInput) {
    const oldUser = await this.userService.findUser(dto.login);

    if (oldUser) {
      throw new BadRequestException(ALREADY_REGISTERED_ERROR);
    }

    return await this.userService.createUser(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post("login")
  async login(@Body() { login, password }: AuthInput) {
    const { email } = await this.userService.validateUser(login, password);

    return await this.authService.login(email);
  }
}

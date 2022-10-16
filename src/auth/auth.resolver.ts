import { BadRequestException, HttpCode, UsePipes, ValidationPipe } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { ALREADY_REGISTERED_ERROR } from "./auth.constants";
import { AuthService } from "./auth.service";
import { AuthInput } from "./inputs/auth.input";
import { LoginModel } from "./models/login.model";
import { UserModel } from "./models/user.model";
import { UserService } from "./user.service";

@Resolver("auth")
export class AuthResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @UsePipes(new ValidationPipe())
  @Mutation(() => UserModel)
  async register(@Args("input") registerArgs: AuthInput) {
    const oldUser = await this.userService.findUser(registerArgs.login);

    if (oldUser) {
      throw new BadRequestException(ALREADY_REGISTERED_ERROR);
    }

    return await this.userService.createUser(registerArgs);
  }

  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Mutation(() => LoginModel)
  async login(@Args("input") { login, password }: AuthInput) {
    const { email } = await this.userService.validateUser(login, password);

    return await this.authService.login(email);
  }
}

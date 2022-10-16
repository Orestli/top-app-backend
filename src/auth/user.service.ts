import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { compare, genSalt, hash } from "bcryptjs";
import { InjectModel } from "nestjs-typegoose";

import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from "./auth.constants";
import { AuthInput } from "./inputs/auth.input";
import { UserModel } from "./models/user.model";

@Injectable()
export class UserService {
  constructor(@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>) {}

  async createUser(dto: AuthInput) {
    const salt = await genSalt(10);

    const newUser = new this.userModel({
      email: dto.login,
      passwordHash: await hash(dto.password, salt),
    });

    return newUser.save();
  }

  async findUser(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async validateUser(email: string, password: string): Promise<Pick<UserModel, "email">> {
    const user = await this.findUser(email);

    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }

    const isCorrectPassword = await compare(password, user.passwordHash);

    if (!isCorrectPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    }

    return {
      email: user.email,
    };
  }
}

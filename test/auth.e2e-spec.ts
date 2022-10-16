import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { disconnect } from "mongoose";
import * as request from "supertest";

import { AppModule } from "../src/app.module";
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from "../src/auth/auth.constants";
import { AuthInput } from "../src/auth/inputs/auth.input";

const loginDto: AuthInput = {
  login: "test@gmail.com",
  password: "testpassword",
};

describe("AuthController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/auth/login (POST) - success", async (done) => {
    return request(app.getHttpServer())
      .post("/auth/login")
      .send(loginDto)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.access_token).toBeDefined();
        done();
      });
  });

  it("/auth/login (POST) - fail login", () => {
    return request(app.getHttpServer())
      .post("/auth/login")
      .send({ ...loginDto, login: "wrong" })
      .expect(401, {
        statusCode: 401,
        message: USER_NOT_FOUND_ERROR,
        error: "Unauthorized",
      });
  });

  it("/auth/login (POST) - fail password", () => {
    return request(app.getHttpServer())
      .post("/auth/login")
      .send({ ...loginDto, password: "wrong" })
      .expect(401, {
        statusCode: 401,
        message: WRONG_PASSWORD_ERROR,
        error: "Unauthorized",
      });
  });

  afterAll(() => disconnect());
});

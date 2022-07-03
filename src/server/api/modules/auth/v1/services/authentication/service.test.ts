import { faker } from "@faker-js/faker";
import { Test } from "@nestjs/testing";
import { Response } from "express";
import { UserV1, UserV1AccountStatus, UserV1Errors } from "../../../../orm";
import { getMockUser, getMockUserV1Service } from "../../../../orm/entities/user/index.mock";
import { mockJwtConfig } from "../../config/jwt.mock";
import { mockPasswordsConfig } from "../../config/passwords.mock";
import { LoginInput } from "../../dto";
import { AuthV1Errors } from "../../utils/message-codes";
import { sanitizeUser } from "../../utils/sanitize-user";
import { mockCredentialsV1Service } from "../credentials/service.mock";
import { PasswordsV1Service } from "../passwords";
import { AuthenticationV1Service } from "./service";

describe("AuthenticationV1Service", () => {
  let authenticationV1Service: AuthenticationV1Service;
  let mockUser: UserV1;
  let mockDisabledUser: UserV1;

  beforeEach(async () => {
    mockUser = getMockUser();
    mockDisabledUser = getMockUser({ accountStatus: UserV1AccountStatus.Disabled });
    const moduleReference = await Test.createTestingModule({
      providers: [
        mockJwtConfig,
        mockPasswordsConfig,
        AuthenticationV1Service,
        PasswordsV1Service,
        mockCredentialsV1Service,
        getMockUserV1Service([mockUser]),
      ],
    }).compile();

    authenticationV1Service = moduleReference.get<AuthenticationV1Service>(AuthenticationV1Service);
  });

  describe("login", () => {
    it("will return a sanitized user and an access token if all checks pass and will send a refresh token as a cookie", async () => {
      //* Arrange
      const data: LoginInput = {
        emailAddress: mockUser.emailAddress,
        password: `password:${mockUser.id}`,
      };

      //* Act
      const result = await authenticationV1Service.login(data);

      //* Assert
      expect(result.user).toMatchObject(sanitizeUser(mockUser));
      expect(result.accessToken).toBeDefined();
    });

    it("will reject the request if a user cannot be found with the requested username", async () => {
      //* Arrange
      const data: LoginInput = {
        emailAddress: "AN_INVALID_USERNAME",
        password: faker.internet.password(),
      };

      //* Act
      const result = authenticationV1Service.login(data);

      //* Assert
      await expect(result).rejects.toThrow(UserV1Errors.UserNotFound);
    });

    it("will reject the request if a user enters an incorrect password", async () => {
      //* Arrange
      const data: LoginInput = {
        emailAddress: mockUser.emailAddress,
        password: "AN_INCORRECT_PASSWORD",
      };

      //* Act
      const result = authenticationV1Service.login(data);

      //* Assert
      await expect(result).rejects.toThrow(UserV1Errors.UserNotFound);
    });

    it("will reject the request if a `disabled` user attempts to log in", async () => {
      //* Arrange
      const data: LoginInput = {
        emailAddress: mockDisabledUser.emailAddress,
        password: `password${mockDisabledUser.id}`,
      };

      //* Act
      const result = authenticationV1Service.login(data);

      //* Assert
      await expect(result).rejects.toThrow(UserV1Errors.UserNotFound);
    });
  });

  describe("logout", () => {
    it("will log out a user by clearing the cookie containing their refresh token", () => {
      //* Arrange
      const response = {
        clearCookie: jest.fn(),
      } as unknown as Response;

      //* Act
      authenticationV1Service.logout(response);

      //* Assert
      expect(response.clearCookie).toHaveBeenCalledTimes(1);
    });
  });

  describe("createNewTokens", () => {
    it("will return an access token and refreshToken", async () => {
      //* Act
      const result = await authenticationV1Service.createNewTokens(mockUser);

      //* Assert
      expect(result.accessToken).toBeDefined();
      expect(result.refreshToken).toBeDefined();
    });

    it("will throw an error if the user's account status is `disabled`", async () => {
      //* Act
      const result = authenticationV1Service.createNewTokens(mockDisabledUser);

      //* Assert
      await expect(result).rejects.toThrow(AuthV1Errors.UserNotActive);
    });
  });
});

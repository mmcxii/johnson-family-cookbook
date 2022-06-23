import { faker } from "@faker-js/faker";
import { ConfigType } from "@nestjs/config";
import { CredentialsV1Service } from "./service";
import { JwtService } from "@nestjs/jwt";
import { RedisService } from "nestjs-redis";
import { Test } from "@nestjs/testing";
import { jwtConfig } from "../../config/jwt";
import { getMockUser, getMockUserV1Service } from "../../../../orm/entities/user/index.mock";
import { mockRedisService } from "../../../../../../shared/test-utils/redis-service.mock";
import { SEVEN_DAYS_IN_SECONDS } from "../../../../../../../shared/time-values";
import { Credentials, DecodedToken } from "../../types";
import { mockJwtConfig } from "../../config/jwt.mock";
import { UserV1 } from "../../../../orm";
import { AuthV1Errors } from "../../utils/message-codes";

describe("CredentialsV1Service", () => {
  let credentialsV1Service: CredentialsV1Service;
  let jwtService: JwtService;
  let jwtConfigReference: ConfigType<typeof jwtConfig>;
  let mockUser: UserV1;

  beforeEach(async () => {
    mockUser = getMockUser();

    const moduleReference = await Test.createTestingModule({
      providers: [
        mockJwtConfig,
        CredentialsV1Service,
        JwtService,
        getMockUserV1Service([mockUser]),
        mockRedisService,
      ],
    }).compile();

    credentialsV1Service = moduleReference.get<CredentialsV1Service>(CredentialsV1Service);
    jwtService = moduleReference.get<JwtService>(JwtService);
    jwtConfigReference = moduleReference.get<ConfigType<typeof jwtConfig>>(jwtConfig.KEY);
  });

  describe("createRefreshToken", () => {
    it("will return a refresh token for a user that expires in 7 days", async () => {
      //* Act
      const result = await credentialsV1Service.createRefreshToken(mockUser);
      const decodedResult = await jwtService.verifyAsync<DecodedToken>(result, {
        secret: jwtConfigReference.refreshToken.secret,
      });

      //* Assert
      expect(decodedResult._version).toBe(mockUser.credentialVersion);
      expect(decodedResult.userId).toBe(mockUser.id);
      expect(decodedResult.exp - decodedResult.iat).toBe(SEVEN_DAYS_IN_SECONDS);
    });
  });

  describe("verifyRefreshToken", () => {
    it("will return a decoded refresh token for a user", async () => {
      //* Arrange
      const tokenData: Credentials = {
        _version: mockUser.credentialVersion,
        userId: mockUser.id,
      };
      const token = await jwtService.signAsync(tokenData, {
        secret: jwtConfigReference.refreshToken.secret,
        expiresIn: jwtConfigReference.refreshToken.lifespan,
      });

      //* Act
      const result = await credentialsV1Service.verifyRefreshToken(token);

      //* Assert
      expect(result.userId).toBe(mockUser.id);
    });

    it("will reject the token if the user's `credentialVersion` does not match the token's `_version`", async () => {
      //* Arrange
      const tokenData: Credentials = {
        _version: mockUser.credentialVersion,
        userId: mockUser.id,
      };
      const token = await jwtService.signAsync(tokenData, {
        secret: jwtConfigReference.refreshToken.secret,
        expiresIn: jwtConfigReference.refreshToken.lifespan,
      });

      // The mock user's credential version will default to less than 10
      // By setting it to a number greater than 11 the method can be expected to fail
      mockUser.credentialVersion = faker.datatype.number({ min: 11 });

      //* Act
      const result = credentialsV1Service.verifyRefreshToken(token);

      //* Assert
      await expect(result).rejects.toThrow(AuthV1Errors.InvalidTokenVersion);
    });
  });

  describe("createAccessToken", () => {
    it("will return an access token for a user that expires in 15 minutes", async () => {
      //* Arrange
      const FIFTEEN_MINUTES = 60 * 15;

      //* Act
      const result = await credentialsV1Service.createAccessToken(mockUser);
      const decodedResult = await jwtService.verifyAsync(result, {
        secret: jwtConfigReference.accessToken.secret,
      });

      //* Assert
      expect(decodedResult._version).toBe(mockUser.credentialVersion);
      expect(decodedResult.userId).toBe(mockUser.id);
      expect(decodedResult.exp - decodedResult.iat).toBe(FIFTEEN_MINUTES);
    });
  });

  describe("verifyAccessToken", () => {
    it("will return a decoded access token for a user", async () => {
      //* Arrange
      const tokenData: Credentials = {
        _version: mockUser.credentialVersion,
        userId: mockUser.id,
      };
      const token = await jwtService.signAsync(tokenData, {
        secret: jwtConfigReference.accessToken.secret,
        expiresIn: jwtConfigReference.accessToken.lifespan,
      });

      //* Act
      const result = await credentialsV1Service.verifyAccessToken(token);

      //* Assert
      expect(result.userId).toBe(mockUser.id);
    });

    it("will reject the token if the user's `credentialVersion` does not match the token's `_version`", async () => {
      //* Arrange
      const tokenData: Credentials = {
        _version: mockUser.credentialVersion,
        userId: mockUser.id,
      };
      const token = await jwtService.signAsync(tokenData, {
        secret: jwtConfigReference.accessToken.secret,
        expiresIn: jwtConfigReference.accessToken.lifespan,
      });

      // The mock user's credential version will default to less than 10
      // By setting it to a number greater than 11 the method can be expected to fail
      mockUser.credentialVersion = faker.datatype.number({ min: 11 });

      //* Act
      const result = credentialsV1Service.verifyAccessToken(token);

      //* Assert
      await expect(result).rejects.toThrow(AuthV1Errors.InvalidTokenVersion);
    });
  });
});

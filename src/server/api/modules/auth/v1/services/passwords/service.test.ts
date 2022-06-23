import * as Bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import { ConfigType } from "@nestjs/config";
import { Test } from "@nestjs/testing";
import { PasswordsV1Service } from "./service";
import { UserV1Errors } from "../../../../orm";
import { mockPasswordsConfig } from "../../config/passwords.mock";
import { passwordsConfig } from "../../config/passwords";

describe("PasswordsV1Service", () => {
  let passwordsV1Service: PasswordsV1Service;
  let passwordsConfigReference: ConfigType<typeof passwordsConfig>;

  beforeEach(async () => {
    const moduleReference = await Test.createTestingModule({
      providers: [PasswordsV1Service, mockPasswordsConfig],
    }).compile();

    passwordsV1Service = moduleReference.get<PasswordsV1Service>(PasswordsV1Service);
    passwordsConfigReference = moduleReference.get<ConfigType<typeof passwordsConfig>>(
      passwordsConfig.KEY,
    );
  });

  describe("hash", () => {
    it("will return a hashed password", async () => {
      //* Arrange
      const password = faker.internet.password();

      //* Act
      const hashedPassword = await passwordsV1Service.hash(password);

      const result = await Bcrypt.compare(password, hashedPassword);

      //* Assert
      expect(result).toBe(true);
    });
  });

  describe("verify", () => {
    it("will return `true` if the password matches the hashed password", async () => {
      //* Arrange
      const password = faker.internet.password();
      const hashedPassword = await Bcrypt.hash(password, passwordsConfigReference.salt);

      //* Act
      const result = passwordsV1Service.verify(password, hashedPassword);

      //* Assert
      await expect(result).resolves.toBe(undefined);
    });

    it("will throw an error if the passwords do not match", async () => {
      //* Arrange
      // By providing a different length for each random password they are
      // guarenteed to be different
      const password = faker.internet.password(5);
      const differentPassword = faker.internet.password(6);
      const hashedDifferentPassword = await Bcrypt.hash(
        differentPassword,
        passwordsConfigReference.salt,
      );

      //* Act
      const result = passwordsV1Service.verify(password, hashedDifferentPassword);

      //* Assert
      await expect(result).rejects.toThrow(UserV1Errors.UserNotFound);
    });
  });
});

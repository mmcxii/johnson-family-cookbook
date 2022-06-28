import { faker } from "@faker-js/faker";
import { Test } from "@nestjs/testing";
import { getMockUserV1Service } from "../../../../orm/entities/user/index.mock";
import { RegisterUserInput } from "../../dto";
import { AuthV1Errors } from "../../utils/message-codes";
import { mockAuthenticationV1Service } from "../authentication/service.mock";
import { mockPasswordsV1Service } from "../passwords/service.mock";
import { RegistrationV1Service } from "./service";

describe("RegistrationV1Service", () => {
  let registrationV1Service: RegistrationV1Service;

  beforeEach(async () => {
    const moduleReference = await Test.createTestingModule({
      providers: [
        RegistrationV1Service,
        mockPasswordsV1Service,
        mockAuthenticationV1Service,
        getMockUserV1Service(),
      ],
    }).compile();

    registrationV1Service = moduleReference.get<RegistrationV1Service>(RegistrationV1Service);
  });

  describe("registerUser", () => {
    let testParams: RegisterUserInput;

    beforeEach(() => {
      const password = faker.internet.password();
      testParams = {
        emailAddress: faker.internet.email(),
        password,
        confirmPassword: password,
      };
    });

    it("will return a new user with a set of tokens", async () => {
      //* Act
      const result = await registrationV1Service.registerUser(testParams);

      //* Assert
      expect(result.user.emailAddress).toBe(testParams.emailAddress);
      expect(result.accessToken).toBe("mock-access-token");
      expect(result.refreshToken).toBe("mock-refresh-token");
    });

    it("will throw an error the password and confirmation do not match", async () => {
      //* Arrange
      const mockInvalidConfirmPassword = "invalid-confirm-password";

      //* Act
      const result = registrationV1Service.registerUser({
        ...testParams,
        confirmPassword: mockInvalidConfirmPassword,
      });

      //* Assert
      await expect(result).rejects.toThrowError(AuthV1Errors.PasswordsMustMatch);
    });
  });
});

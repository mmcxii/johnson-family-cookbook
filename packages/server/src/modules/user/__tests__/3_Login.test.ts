import {} from "bcryptjs";

import { handleTestDatabaseConnection } from "../../../testUtils/handleTestDatabaseConnection";
import { UserAccountStatusEnum } from "../../../types/user.types";
import { User } from "../../../entities/User";
import { gCall } from "../../../testUtils/gCall";
import { createTestUser } from "../../../testUtils/createTestUser";
import { UserResponse } from "../common/UserResponse";

handleTestDatabaseConnection();

const loginMutation = `
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      status
      message
    }
  }
`;

let user: User;
let inactiveUser: User;
beforeAll(async () => {
  user = await createTestUser(UserAccountStatusEnum.Active);
  inactiveUser = await createTestUser(UserAccountStatusEnum.NotConfirmed);
});

describe("LoginResolver tests", () => {
  it("logs an active user in", async () => {
    //* Arrange
    const data = {
      email: user.email,
      password: "password",
    };

    //* Act
    const res = await gCall({
      source: loginMutation,
      variableValues: { data },
    });
    const resData: UserResponse = res.data!.login!;

    //* Assert
    expect(resData.status).toBe("SUCCESS");
  });

  it("wont let a user log in with an invalid email", async () => {
    //* Arrange
    const data = {
      email: `${user.email}_thisIsWrong`,
      password: "password",
    };

    //* Act
    const res = await gCall({
      source: loginMutation,
      variableValues: { data },
    });
    const resData: UserResponse = res.data!.login!;

    //* Assert
    expect(resData.status).toBe("ERROR");
    expect(resData.message).toBe("Incorrect email or password.");
  });

  it("wont let a user log in with an invalid password", async () => {
    //* Arrange
    const data = {
      email: user.email,
      password: "wrong_password",
    };

    //* Act
    const res = await gCall({
      source: loginMutation,
      variableValues: { data },
    });
    const resData: UserResponse = res.data!.login!;

    //* Assert
    expect(resData.status).toBe("ERROR");
    expect(resData.message).toBe("Incorrect email or password.");
  });

  it(`wont let a user log unless their account status is: ${UserAccountStatusEnum.Active}`, async () => {
    //* Arrange
    const data = {
      email: inactiveUser.email,
      password: "password",
    };

    //* Act
    const res = await gCall({
      source: loginMutation,
      variableValues: { data },
    });
    const resData: UserResponse = res.data!.login!;

    //* Assert
    expect(resData.status).toBe("ERROR");
    expect(resData.message).toBe(
      "You must confirm your account before loggin in. Please check your email for your verification link.",
    );
  });
});

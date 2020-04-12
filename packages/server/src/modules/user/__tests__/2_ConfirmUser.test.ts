import { handleTestDatabaseConnection } from "../../../testUtils/handleTestDatabaseConnection";
import { UserAccountStatusEnum } from "../../../types/user.types";
import { User } from "../../../entities/User";
import { gCall } from "../../../testUtils/gCall";
import { createTestUser } from "../../../testUtils/createTestUser";
import { UserResponse } from "../common/UserResponse";

handleTestDatabaseConnection();

const confirmUserMutation = `
  mutation ConfirmUser($userId: String!) {
    confirmUser(userId: $userId) {
      status
      message
    }
  }
`;

let user: User;
beforeAll(async () => {
  user = await createTestUser();
});

describe("ConfirmUserResolver tests", () => {
  it(`confirms a user with account status: ${UserAccountStatusEnum.NotConfirmed}`, async () => {
    //* Arrange
    const cookie = jest.fn();

    //* Act
    const res = await gCall({
      source: confirmUserMutation,
      variableValues: { userId: user?.externalId },
      cookie,
    });
    await user?.reload();

    //* Assert
    expect(res.data!.confirmUser!.status).toBe("SUCCESS");

    expect(user?.accountStatus).toBe(UserAccountStatusEnum.Active);
    expect(cookie).toBeCalled();
  });

  it(`wont attemt to confirm a user with confirmation status: ${UserAccountStatusEnum.Active}`, async () => {
    //* Act
    const res = await gCall({
      source: confirmUserMutation,
      variableValues: { userId: user?.externalId },
    });
    await user?.reload();
    const data: UserResponse = res.data!.confirmUser!;

    //* Assert
    expect(data.status).toBe("ERROR");
    expect(data.message).toBe("Your account has already been confirmed.");
  });

  it("wont attemt to confirm a user that can't be found", async () => {
    //* Act
    const res = await gCall({
      source: confirmUserMutation,
      // This is a valid uuid that is not associated with an account
      variableValues: { userId: "bd03b62d-186a-4c2b-ad27-60f7b50ef5ee" },
    });
    await user?.reload();
    const data: UserResponse = res.data!.confirmUser!;

    //* Assert
    expect(data.status).toBe("ERROR");
    expect(data.message).toBe("No account was found.");
  });
});

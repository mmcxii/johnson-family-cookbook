import { handleTestDatabaseConnection } from "../../../testUtils/handleTestDatabaseConnection";
import { UserAccountStatusEnum } from "../../../types/user.types";
import { User } from "../../../entities/User";
import { gCall } from "../../../testUtils/gCall";

handleTestDatabaseConnection();

const confirmUserMutation = `
  mutation ConfirmUser($userId: String!) {
    confirmUser(userId: $userId) {
      status
    }
  }
`;

describe("ConfirmUserResolver tests", () => {
  it(`confirms a user with account status: ${UserAccountStatusEnum.NotConfirmed}`, async () => {
    //* Arrange
    const user = await User.findOne({
      where: { accountStatus: UserAccountStatusEnum.NotConfirmed },
    });

    //* Act
    const res = await gCall({
      source: confirmUserMutation,
      variableValues: { userId: user?.externalId },
    });
    await user?.reload();

    //* Assert
    expect(res.data!.confirmUser!.status).toBe("SUCCESS");

    expect(user?.accountStatus).toBe(UserAccountStatusEnum.Active);
  });
});

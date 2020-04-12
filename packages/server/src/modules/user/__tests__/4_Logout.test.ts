import { handleTestDatabaseConnection } from "../../../testUtils/handleTestDatabaseConnection";
import { gCall } from "../../../testUtils/gCall";

handleTestDatabaseConnection();

const logoutMutation = `
  mutation Logout {
    logout {
      status
    }
  }
`;

describe("LogoutResolver tests", () => {
  it("logs out a user and clears out their cookies", async () => {
    //* Arrange
    const clearCookie = jest.fn();

    //* Act
    const res = await gCall({
      source: logoutMutation,
      clearCookie,
    });

    //* Assert
    expect(res.data!.logout!.status).toBe("SUCCESS");
    expect(clearCookie).toBeCalled();
  });
});

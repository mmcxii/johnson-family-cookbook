import faker from "faker";

import { gCall } from "../../../testUtils/gCall";
import { User } from "../../../entities/User";
import { UserAccountStatusEnum } from "../../../types/user.types";
import { handleTestDatabaseConnection } from "../../../testUtils/handleTestDatabaseConnection";

handleTestDatabaseConnection();

const createUserMutation = `
  mutation CreateUser($data: CreateUserInput!) {
    createUser(
      data: $data
    ) {
      status
      message
      payload {
        user {
          externalId
        }
      }
    }
  }
`;

describe("CreateUserResolver tests", () => {
  //* Arrange
  const randomNumber = Math.floor(Math.random() * 3) + 1;
  const data = {
    firstName: `${faker.name.firstName().toUpperCase()}   `,
    lastName: `    ${faker.name.lastName()}      `,
    email: faker.internet.email(),
    // This string is used so the created entity can be used to test the login resolver
    password: "password",
    birthday: faker.date.past(),
    genderCode:
      // eslint-disable-next-line no-nested-ternary
      randomNumber === 1 ? "Male" : randomNumber === 2 ? "Female" : "Other",
    permissionLevelCode:
      // eslint-disable-next-line no-nested-ternary
      randomNumber === 1 ? "Admin" : randomNumber === 2 ? "User" : "Guest",
  };

  it("succesfully creates a user", async () => {
    //* Act
    const res = await gCall({
      source: createUserMutation,
      variableValues: { data },
    });

    const user = await User.findOne({
      where: { email: data.email.toLowerCase() },
      relations: ["gender", "permissionLevel"],
    });

    //* Assert
    expect(res.data!.createUser!.status).toBe("SUCCESS");

    expect(user).toBeDefined();
    expect(user?.firstName).toBe(data.firstName.toLowerCase().trim());
    expect(user?.password).not.toBe(data.password);
    expect(user?.accountStatus).toBe(UserAccountStatusEnum.NotConfirmed);
    expect(user?.gender.code).toBe(randomNumber);
    expect(user?.permissionLevel.code).toBe(
      // eslint-disable-next-line no-nested-ternary
      randomNumber === 1 ? 0 : randomNumber === 2 ? 100 : 200,
    );
  });

  test("doesn't create a user if the email is already in use", async () => {
    //* Arrange
    const duplicateData = data;

    //* Act
    const res = await gCall({
      source: createUserMutation,
      variableValues: { data: duplicateData },
    });

    //* Assert
    expect(res.data!.createUser!.status).toBe("ERROR");
    expect(res.data!.createUser!.payload).toMatchObject({ user: null });
  });
});

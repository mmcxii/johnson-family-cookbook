import * as Bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import { UserV1 } from "./entity";
import { UserV1AccountStatus } from "./utils";

export function getMockUser(params?: Partial<UserV1>): UserV1 {
  const id = faker.datatype.number();

  return {
    id,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    accountStatus: UserV1AccountStatus.Active,
    credentialVersion: faker.datatype.number(),
    emailAddress: faker.internet.email(),
    password: Bcrypt.hashSync(`password:${id}`, 12),
    archivedAt: undefined,
    ...(params ?? {}),
  };
}

import { faker } from "@faker-js/faker";
import * as Bcrypt from "bcrypt";
import { UserV1 } from "./entity";
import { UserV1AccountStatus } from "./utils";

export function getMockUser(params: Partial<UserV1> = {}): UserV1 {
  const id = faker.datatype.number();

  return {
    accountStatus: UserV1AccountStatus.Active,
    archivedAt: undefined,
    createdAt: faker.date.past(),
    credentialVersion: faker.datatype.number(),
    emailAddress: faker.internet.email(),
    id,
    password: Bcrypt.hashSync(`password:${id}`, 12),
    updatedAt: faker.date.recent(),
    ...params,
  };
}

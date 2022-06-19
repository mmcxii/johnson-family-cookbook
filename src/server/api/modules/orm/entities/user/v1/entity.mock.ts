import { faker } from "@faker-js/faker";
import { UserV1 } from "./entity";

export function getMockUser(params: Partial<UserV1>): UserV1 {
  return {
    id: faker.datatype.number(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    credentialVersion: faker.datatype.number(),
    emailAddress: faker.internet.email(),
    password: faker.internet.password(),
    archivedAt: undefined,
    ...params,
  };
}

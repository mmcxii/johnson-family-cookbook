import bcrypt from "bcryptjs";
import faker from "faker";

import { User } from "../entities/User";
import { UserAccountStatusEnum } from "../types/user.types";
import { SALT } from "../constants/envVariables";

export const createTestUser = async (
  accountStatus: UserAccountStatusEnum = UserAccountStatusEnum.NotConfirmed,
) =>
  User.create({
    accountStatus,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email().toLowerCase(),
    password: await bcrypt.hash("password", SALT!),
    birthday: faker.date.past(),
    genderId: Math.floor(Math.random() * 3) + 1,
    permissionLevelId: Math.floor(Math.random() * 3) + 1,
  }).save();

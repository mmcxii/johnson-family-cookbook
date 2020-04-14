import { Router } from "express";
import faker from "faker";
import bcrypt from "bcryptjs";

import { SALT } from "./constants/envVariables";
import { PermissionLevelCodeEnum } from "./types/permissionLevel.types";
import { normalizeData } from "./utils/normalizeData";
import { findUserWithRelations } from "./modules/user/utils/findUserWithRelations";
import { Gender } from "./entities/Gender";
import { PermissionLevel } from "./entities/PermissionLevel";
import { User } from "./entities/User";
import { UserAccountStatusEnum } from "./types/user.types";

export const testUtilityRoute = Router()
  .get("/user", async (_, res) => {
    const data = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: "user@test.com",
      password: await bcrypt.hash("password", SALT!),
      birthday: faker.date.past(),
      genderCode: Math.floor(Math.random() * 3) + 1,
      permissionLevelCode: PermissionLevelCodeEnum.User,
    };
    const {
      password,
      genderCode,
      permissionLevelCode,
      ...dataToBeNormalized
    } = data;
    const normalizedData = normalizeData(dataToBeNormalized);
    const hashedPassword = await bcrypt.hash(password, SALT!);

    const testUserExists = await findUserWithRelations({
      email: normalizedData.email,
    });
    if (testUserExists) {
      return res.send(testUserExists);
    }

    const [gender, permissionLevel] = await Promise.all([
      Gender.findOne({ where: { code: genderCode } }),
      PermissionLevel.findOne({ where: { code: permissionLevelCode } }),
    ]);

    const user = await User.create({
      ...normalizedData,
      gender,
      permissionLevel,
      password: hashedPassword,
      accountStatus: UserAccountStatusEnum.Active,
    }).save();

    return res.send(user);
  })
  .get("/user/delete", async (_, res) => {
    const results = await Promise.all([
      User.delete({ email: "user@test.com" }),
      User.delete({ email: "cypress@test.com" }),
    ]);
    const numberOfDeletedRows = results
      .map((r) => (r.affected ? r.affected : 0))
      .reduce((p, c) => p + c);

    return res.send(`Deleted ${numberOfDeletedRows} users`);
  });

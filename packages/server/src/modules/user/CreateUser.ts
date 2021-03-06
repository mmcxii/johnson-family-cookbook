import { Resolver, Mutation, Arg } from "type-graphql";
import bcrypt from "bcryptjs";

import { SALT } from "../../constants/envVariables";
import { UserResponse } from "./common/UserResponse";
import { CreateUserInput } from "./createUser/CreateUserInput";
import { User } from "../../entities/User";
import { normalizeData } from "../../utils/normalizeData";
import { sendConfirmationEmail } from "../utils/sendConfirmationEmail";
import { createConfirmationUrl } from "../utils/createConfirmationUrl";
import { Gender } from "../../entities/Gender";
import { PermissionLevel } from "../../entities/PermissionLevel";

@Resolver()
export class CreateUserResolver {
  @Mutation(() => UserResponse)
  async createUser(@Arg("data") data: CreateUserInput): Promise<UserResponse> {
    /**
     * The password, genderId, and permissionLevelId are extracted from the data object.
     * The remaining values are marked as needing to be normalized.
     */
    const {
      password,
      genderCode,
      permissionLevelCode,
      ...dataToBeNormalized
    } = data;

    /**
     * Remaining data is sanitized.
     */
    const normalizedData = normalizeData(dataToBeNormalized);

    /**
     * Confirm the requested email is not already in use by attempting to find
     * an existing user with that email.
     */
    const emailIsInUse = !!(await User.findOne({
      where: { email: normalizedData.email },
    }));
    if (emailIsInUse) {
      return {
        status: "ERROR",
        message:
          "That email address is already in use. Please select another email address.",
        payload: {
          user: null,
        },
      };
    }

    /**
     * Paswords are secured using a hidden SALT value stored in an environment variable.
     */
    const hashedPassword = await bcrypt.hash(password, SALT!);

    /**
     * The associated gender and permissionLevel are retrieved from their tables.
     */
    const [gender, permissionLevel] = await Promise.all([
      Gender.findOne({ where: { code: genderCode } }),
      PermissionLevel.findOne({ where: { code: permissionLevelCode } }),
    ]);

    /**
     * The user is recorded in the database using the modified and secured data.
     */
    const user = await User.create({
      ...normalizedData,
      gender,
      permissionLevel,
      password: hashedPassword,
    }).save();

    /**
     * If for any reason an error occurs when creating the account the user is informed
     * and asked to reattempt account creation.
     */
    if (!user) {
      return {
        status: "ERROR",
        message:
          "An error occured while creating your account. Please try again.",
        payload: {
          user: null,
        },
      };
    }

    /**
     * The user is sent a confirmation email with their unique id as a url parameter.
     */
    await sendConfirmationEmail(
      user.email,
      createConfirmationUrl(user.externalId), // eslint-disable-line no-underscore-dangle
    );

    /**
     * Once all checks have passed the user is informed that their account
     * has been successfully created.
     */
    return {
      status: "SUCCESS",
      message:
        "Your account has been successfully created! Please check your email to confirm your account",
      payload: {
        user,
      },
    };
  }
}

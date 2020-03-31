import { Resolver, Mutation, Arg } from "type-graphql";
import bcrypt from "bcryptjs";

import { SALT } from "../../constants/envVariables";
import { UserResponse } from "./common/UserResponse";
import { CreateUserInput } from "./createUser/CreateUserInput";
import { User } from "../../entities/User";
import { Gender } from "../../entities/Gender";
import { PermissionLevel } from "../../entities/PermissionLevel";
import { normalizeData } from "../../utils/normalizeData";
import { sendConfirmationEmail } from "../utils/sendConfirmationEmail";
import { createConfirmationUrl } from "../utils/createConfirmationUrl";

@Resolver()
export class CreateUserResolver {
  @Mutation(() => UserResponse)
  async createUser(@Arg("data") data: CreateUserInput): Promise<UserResponse> {
    /**
     * Confirm the requested email is not already in use by attempting to find
     * an existing user with that email.
     */
    const emailIsInUse = await User.findOne({ where: { email: data.email } });
    if (emailIsInUse) {
      return {
        status: "ERROR",
        message:
          "That email address is already in use. Please select another email address.",
        payload: null,
      };
    }

    /**
     * The password, genderId, and permissionLevelId are extracted from the data object.
     * The remaining values are marked as needing to be normalized.
     */
    const {
      password,
      genderId,
      permissionLevelId,
      ...dataToBeNormalized
    } = data;

    /**
     * Paswords are secured using a hidden SALT value stored in an environment variable.
     */
    const hashedPassword = await bcrypt.hash(password, SALT!);

    /**
     * The user's gender and permissionLevel are retrieved from their respective tables.
     */
    const [gender, permissionLevel] = await Promise.all([
      Gender.findOne(genderId),
      PermissionLevel.findOne(permissionLevelId),
    ]);

    /**
     * Remaining data is sanitized, all text is converted to lowercase and whitespace is trimmed.
     */
    const normalizedData = normalizeData(dataToBeNormalized);

    /**
     * The user is recorded in the database using the modified, found, and secured data.
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
        payload: null,
      };
    }

    await sendConfirmationEmail(
      user.email,
      await createConfirmationUrl(user._externalId_), // eslint-disable-line no-underscore-dangle
    );

    /**
     * Once all checks have passed the user is informed that their account
     * has been successfully created.
     */
    return {
      status: "SUCCESS",
      message:
        "Your account has been successfully created! Please check your email to confirm your account",
      payload: user,
    };
  }
}

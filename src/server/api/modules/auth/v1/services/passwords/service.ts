import * as Bcrypt from "bcrypt";
import { ConfigType } from "@nestjs/config";
import { NotFoundError } from "@mikro-orm/core";
import { UserV1Errors } from "../../../../orm";
import { Inject } from "@nestjs/common";
import { passwordsConfig } from "../../config/passwords";

export class PasswordsV1Service {
  constructor(
    @Inject(passwordsConfig.KEY)
    private readonly config: ConfigType<typeof passwordsConfig>,
  ) {}

  public async hash(plainTextPassword: string): Promise<string> {
    const hashedPassword = await Bcrypt.hash(plainTextPassword, this.config.salt);

    return hashedPassword;
  }

  public async verify(plainTextPassword: string, hashedPassword: string): Promise<void> {
    // Determine if the provided password matches the password stored in the database
    const isPasswordCorrect = await Bcrypt.compare(plainTextPassword, hashedPassword);

    // If the passwords do not match reject the request but do not tell the user the password was incorrect
    if (!isPasswordCorrect) {
      throw new NotFoundError(UserV1Errors.UserNotFound);
    }
  }
}

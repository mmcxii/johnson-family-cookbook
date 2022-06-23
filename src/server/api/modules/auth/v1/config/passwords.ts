import { registerAs } from "@nestjs/config";
import { getPasswordSalt } from "../../../../../shared/env";

export type PasswordsConfig = {
  salt: number;
};

export const passwordsConfig = registerAs("passwords", (): PasswordsConfig => {
  return {
    salt: getPasswordSalt(),
  };
});

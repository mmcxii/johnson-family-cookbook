import { Provider } from "@nestjs/common";
import { passwordsConfig, PasswordsConfig } from "./passwords";

export const mockPasswordsConfig: Provider<PasswordsConfig> = {
  provide: passwordsConfig.KEY,
  useValue: {
    salt: 12,
  },
};

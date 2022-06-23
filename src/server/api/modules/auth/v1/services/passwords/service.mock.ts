import { Provider } from "@nestjs/common";
import { PasswordsV1Service } from "./service";

export const mockPasswordsV1Service: Provider = {
  provide: PasswordsV1Service,
  useValue: {
    hash: async () => {
      return "hashed-password";
    },
    verify: async () => {
      return;
    },
  },
};

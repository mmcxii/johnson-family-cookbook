import { Provider } from "@nestjs/common";
import { AuthenticationV1Service } from "./service";

export const mockAuthenticationV1Service: Provider = {
  provide: AuthenticationV1Service,
  useValue: {
    createNewTokens: () => {
      return {
        accessToken: "mock-access-token",
        refreshToken: "mock-refresh-token",
      };
    },
  },
};

import { Provider } from "@nestjs/common";
import { DecodedToken } from "../../types";
import { CredentialsV1Service } from "./service";

export const mockCredentialsV1Service: Provider = {
  provide: CredentialsV1Service,
  useValue: {
    createRefreshToken: async (): Promise<string> => {
      return "mock-refresh-token";
    },
    verifyRefreshToken: async (): Promise<DecodedToken> => {
      return {
        _version: 1,
        exp: 2112,
        iat: 2112,
        userId: 2112,
      };
    },
    createAccessToken: async (): Promise<string> => {
      return "mock-access-token";
    },
    verifyAccessToken: async (): Promise<DecodedToken> => {
      return {
        _version: 1,
        exp: 2112,
        iat: 2112,
        userId: 2112,
      };
    },
  },
};

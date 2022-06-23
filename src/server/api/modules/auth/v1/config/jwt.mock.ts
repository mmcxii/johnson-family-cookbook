import { Provider } from "@nestjs/common";
import { JWT_FIFTEEN_MINUTES, JWT_SEVEN_DAYS } from "../../../../../../shared/time-values";
import { JwtConfig, jwtConfig } from "./jwt";

export const mockJwtConfig: Provider<JwtConfig> = {
  provide: jwtConfig.KEY,
  useValue: {
    accessToken: {
      lifespan: JWT_FIFTEEN_MINUTES,
      secret: "mock-access-token-secret",
    },
    refreshToken: {
      lifespan: JWT_SEVEN_DAYS,
      secret: "mock-refresh-token-secret",
    },
  },
};

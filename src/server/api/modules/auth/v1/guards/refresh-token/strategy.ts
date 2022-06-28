import { Inject } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, StrategyOptions } from "passport-jwt";
import { UserV1, UserV1Service } from "../../../../orm";
import { jwtConfig } from "../../config/jwt";
import { DecodedToken } from "../../types";

export const REFRESH_TOKEN = "refresh-token";

export class RefreshTokenStrategy extends PassportStrategy(Strategy, REFRESH_TOKEN) {
  constructor(
    @Inject(jwtConfig.KEY)
    protected readonly config: ConfigType<typeof jwtConfig>,
    private readonly userV1Service: UserV1Service,
  ) {
    super({
      jwtFromRequest: (request) => {
        const cookie = request.cookies[config.refreshToken.cookieName];

        return cookie;
      },
      ignoreExpiration: false,
      secretOrKey: config.refreshToken.secret,
    } as StrategyOptions);
  }

  public async validate(payload: DecodedToken): Promise<UserV1> {
    const user = await this.userV1Service.findByIdOrFail(payload.userId);

    return user;
  }
}

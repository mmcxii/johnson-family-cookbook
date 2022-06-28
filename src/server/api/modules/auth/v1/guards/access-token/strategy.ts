import { Inject } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserV1, UserV1Service } from "../../../../orm";
import { jwtConfig } from "../../config/jwt";
import { DecodedToken } from "../../types";

export const ACCESS_TOKEN = "access-token";

export class AccessTokenStrategy extends PassportStrategy(Strategy, ACCESS_TOKEN) {
  constructor(
    @Inject(jwtConfig.KEY)
    protected readonly config: ConfigType<typeof jwtConfig>,
    private readonly userV1Service: UserV1Service,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.accessToken.secret,
    });
  }

  public async validate(payload: DecodedToken): Promise<UserV1> {
    const user = await this.userV1Service.findByIdOrFail(payload.userId);

    return user;
  }
}

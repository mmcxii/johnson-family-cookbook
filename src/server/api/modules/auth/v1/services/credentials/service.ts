import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { JwtService, JwtSignOptions, JwtVerifyOptions } from "@nestjs/jwt";
import { RedisService } from "nestjs-redis";
import { SEVEN_DAYS_IN_SECONDS } from "../../../../../../../shared/time-values";
import { UserV1, UserV1Service } from "../../../../orm";
import { jwtConfig } from "../../config/jwt";
import { Credentials, DecodedToken } from "../../types";
import { AuthV1CachePrefixes } from "../../utils/cache-prefixes";
import { AuthV1Errors } from "../../utils/message-codes";

@Injectable()
export class CredentialsV1Service {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly config: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
    private readonly userV1Service: UserV1Service, // private readonly redisService: RedisService,
  ) {}

  public async createRefreshToken(user: UserV1): Promise<string> {
    const token = await this._createToken(user, {
      expiresIn: this.config.refreshToken.lifespan,
      secret: this.config.refreshToken.secret,
    });

    return token;
  }

  public async verifyRefreshToken(token: string): Promise<DecodedToken> {
    const decodedToken = this._verifyToken(token, {
      secret: this.config.refreshToken.secret,
    });

    return decodedToken;
  }

  public async createAccessToken(user: UserV1): Promise<string> {
    const token = this._createToken(user, {
      expiresIn: this.config.accessToken.lifespan,
      secret: this.config.accessToken.secret,
    });

    return token;
  }

  public async verifyAccessToken(token: string): Promise<DecodedToken> {
    const decodedToken = this._verifyToken(token, {
      secret: this.config.accessToken.secret,
    });

    return decodedToken;
  }

  private async _createToken(user: UserV1, options: JwtSignOptions): Promise<string> {
    const credentialData: Credentials = {
      _version: user.credentialVersion,
      userId: user.id,
    };

    const signed = await this.jwtService.signAsync(credentialData, options);

    return signed;
  }

  private async _verifyToken(token: string, options: JwtVerifyOptions): Promise<DecodedToken> {
    const decodedToken = await this.jwtService.verifyAsync<DecodedToken>(token, options);

    // Find the user the token belongs to
    const user = await this.userV1Service.findByIdOrFail(decodedToken.userId);

    // If the user's credential version does not match the token's version
    // the token should be regarded as compromised and invalid
    if (user.credentialVersion !== decodedToken._version) {
      throw new Error(AuthV1Errors.InvalidTokenVersion);
    }

    return decodedToken;
  }

  // private async _storeTokenInCache(
  //   prefix: AuthV1CachePrefixes,
  //   id: string,
  //   token: string,
  // ): Promise<boolean> {
  //   const redis = this.redisService.getClient();

  //   try {
  //     await redis.set(`${prefix}${id}`, token, "ex", SEVEN_DAYS_IN_SECONDS);

  //     return true;
  //   } catch {
  //     return false;
  //   }
  // }

  // private async _retrieveTokenFromCache(prefix: AuthV1CachePrefixes, id: string): Promise<string> {
  //   const redis = this.redisService.getClient();

  //   const token = await redis.get(`${prefix}${id}`);

  //   if (!token) {
  //     throw new Error(AuthV1Errors.TokenNotFound);
  //   }

  //   return token;
  // }

  // private async _deleteTokenFromCache(prefix: AuthV1CachePrefixes, id: string): Promise<boolean> {
  //   const redis = this.redisService.getClient();

  //   const result = !!(await redis.del(`${prefix}${id}`));

  //   return result;
  // }
}

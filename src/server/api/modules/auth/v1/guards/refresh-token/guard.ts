import { AuthGuard } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { REFRESH_TOKEN } from "./strategy";

@Injectable()
export class RefreshTokenGuard extends AuthGuard(REFRESH_TOKEN) {}

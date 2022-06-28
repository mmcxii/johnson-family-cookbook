import { AuthGuard } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ACCESS_TOKEN } from "./strategy";

@Injectable()
export class AccessTokenGuard extends AuthGuard(ACCESS_TOKEN) {}

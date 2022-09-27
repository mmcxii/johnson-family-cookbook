import { SanitizedUser } from "../../../server/api/modules/auth";

export type User = SanitizedUser;

export type RequestState = "error" | "idle" | "loading" | "success";

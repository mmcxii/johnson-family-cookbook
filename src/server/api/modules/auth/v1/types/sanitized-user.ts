import { UserV1 } from "../../../orm";

type SecretValues = Pick<UserV1, "credentialVersion" | "password">;

export const SECRET_VALUES: Array<keyof SecretValues> = ["credentialVersion", "password"];

export type SanitizedUser = Omit<UserV1, keyof SecretValues>;

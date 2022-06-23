import { UserV1 } from "../../../orm";

export type Credentials = {
  _version: UserV1["credentialVersion"];
  userId: UserV1["id"];
};

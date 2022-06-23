import { Entity, Enum, Property } from "@mikro-orm/core";
import { _BaseEntity } from "../../base-entity";
import { UserV1AccountStatus } from "./utils";

@Entity()
export class UserV1 extends _BaseEntity {
  @Property({
    default: 1,
  })
  public credentialVersion: number;

  @Enum({
    items: () => UserV1AccountStatus,
    default: UserV1AccountStatus.Active,
  })
  public accountStatus: UserV1AccountStatus;

  @Property({
    unique: true,
  })
  public emailAddress: string;

  @Property()
  public password: string;
}

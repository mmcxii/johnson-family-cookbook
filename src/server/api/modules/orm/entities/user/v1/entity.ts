import { Entity, Property } from "@mikro-orm/core";
import { _BaseEntity } from "../../base-entity";

@Entity()
export class UserV1 extends _BaseEntity {
  @Property({
    default: 1,
  })
  public credentialVersion: number;

  @Property({
    unique: true,
  })
  public emailAddress: string;

  @Property()
  public password: string;
}

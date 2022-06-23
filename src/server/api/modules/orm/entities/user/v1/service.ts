import { Injectable } from "@nestjs/common";
import { _BaseEntityService } from "../../base-entity-service";
import { UserV1 } from "./entity";

@Injectable()
export class UserV1Service extends _BaseEntityService<UserV1> {
  protected defaultPopulate: undefined;

  public async findOneByEmailAddressOrFail(emailAddress: UserV1["emailAddress"]): Promise<UserV1> {
    const user = await this.findOneOrFail({ emailAddress });

    return user;
  }
}

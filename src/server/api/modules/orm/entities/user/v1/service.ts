import { Injectable } from "@nestjs/common";
import { _BaseEntityService } from "../../base-entity-service";
import { UserV1 } from "./entity";

@Injectable()
export class UserV1Service extends _BaseEntityService<UserV1> {
  protected defaultPopulate: undefined;
}

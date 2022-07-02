import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { _BaseEntityService } from "../../base-entity-service";
import { CreateUserV1Params } from "./dto/create-params";
import { UserV1 } from "./entity";
import { UserV1AccountStatus } from "./utils";

@Injectable()
export class UserV1Service extends _BaseEntityService<UserV1> {
  constructor(
    @InjectRepository(UserV1)
    protected readonly entityRepository: EntityRepository<UserV1>,
  ) {
    super(entityRepository);
  }

  protected defaultPopulate: undefined;

  public async findOneByEmailAddressOrFail(emailAddress: UserV1["emailAddress"]): Promise<UserV1> {
    const user = await this.findOneOrFail({ emailAddress });

    return user;
  }

  public async createAndFlush(params: CreateUserV1Params): Promise<UserV1> {
    const user = this.entityRepository.create({
      accountStatus: UserV1AccountStatus.Active,
      createdAt: new Date(),
      credentialVersion: 1,
      emailAddress: params.emailAddress,
      password: params.password,
      updatedAt: new Date(),
    });
    await this.entityRepository.persistAndFlush(user);

    return user;
  }
}

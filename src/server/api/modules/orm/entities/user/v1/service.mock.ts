import { Provider } from "@nestjs/common";
import { getBaseMockEntityService } from "../../test-utils/entity-service.mock";
import { mockRepository } from "../../test-utils/mock-repository";
import { CreateUserV1Params } from "./dto/create-params";
import { UserV1 } from "./entity";
import { getMockUser } from "./entity.mock";
import { UserV1Service } from "./service";
import { UserV1Errors } from "./utils/message-codes";

export function getMockUserV1Service(users: Array<UserV1> = [getMockUser()]): Provider {
  return {
    provide: UserV1Service,
    useValue: {
      ...getBaseMockEntityService(users),
      createAndFlush: async (params: CreateUserV1Params): Promise<UserV1> => {
        return getMockUser(params);
      },
      findOneByEmailAddressOrFail: async (
        emailAddress: UserV1["emailAddress"],
      ): Promise<UserV1> => {
        const user = users
          .filter((u) => u.archivedAt == null)
          .find((u) => u.emailAddress === emailAddress);

        if (!user) {
          throw new Error(UserV1Errors.UserNotFound);
        }

        return user;
      },
    },
  };
}

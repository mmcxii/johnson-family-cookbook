import { Provider } from "@nestjs/common";
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
      findAll: async (): Promise<Array<UserV1>> => {
        return users.filter((u) => u.archivedAt == null);
      },
      findByIdOrFail: async (id: UserV1["id"]): Promise<UserV1> => {
        const user = users.filter((u) => u.archivedAt == null).find((u) => u.id === id);

        if (!user) {
          throw new Error(UserV1Errors.UserNotFound);
        }

        return user;
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
      createAndFlush: async (params: CreateUserV1Params): Promise<UserV1> => {
        return getMockUser(params);
      },
      getRepository: (): any => {
        return mockRepository(users);
      },
      findByIdAndArchiveOrFail: async (id: UserV1["id"]): Promise<UserV1> => {
        const user = users.filter((u) => u.archivedAt == null).find((u) => u.id === id);

        if (!user) {
          throw new Error(UserV1Errors.UserNotFound);
        }

        user.archivedAt = new Date();

        return user;
      },
      findByIdAndUnarchiveOrFail: async (id: UserV1["id"]): Promise<UserV1> => {
        const user = users.filter((u) => u.archivedAt != null).find((u) => u.id === id);

        if (!user) {
          throw new Error(UserV1Errors.UserNotFound);
        }

        user.archivedAt = undefined;

        return user;
      },
      findArchivedByIdOrFail: async (id: UserV1["id"]): Promise<UserV1> => {
        const user = users.filter((u) => u.archivedAt != null).find((u) => u.id === id);

        if (!user) {
          throw new Error(UserV1Errors.UserNotFound);
        }

        return user;
      },
    },
  };
}

import { Provider } from "@nestjs/common";
import { mockRepository } from "../../test-utils/mock-repository";
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
      createAndFlush: async (): Promise<UserV1> => {
        return getMockUser();
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

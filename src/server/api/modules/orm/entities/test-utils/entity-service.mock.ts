import { SharedV1Errors } from "../../../../../../shared/constants/errors";
import { _BaseEntity } from "../base-entity";
import { mockRepository } from "./mock-repository";

export function getBaseMockEntityService<TEntity extends _BaseEntity>(entities: Array<TEntity>) {
  return {
    findAll: async (): Promise<Array<TEntity>> => {
      return entities.filter((u) => u.archivedAt == null);
    },
    findArchivedByIdOrFail: async (id: TEntity["id"]): Promise<TEntity> => {
      const entity = entities.filter((u) => u.archivedAt != null).find((u) => u.id === id);

      if (!entity) {
        throw new Error(SharedV1Errors.NotFound);
      }

      return entity;
    },
    findByIdAndArchiveOrFail: async (id: TEntity["id"]): Promise<TEntity> => {
      const entity = entities.filter((u) => u.archivedAt == null).find((u) => u.id === id);

      if (!entity) {
        throw new Error(SharedV1Errors.NotFound);
      }

      entity.archivedAt = new Date();

      return entity;
    },
    findByIdAndUnarchiveOrFail: async (id: TEntity["id"]): Promise<TEntity> => {
      const entity = entities.filter((u) => u.archivedAt != null).find((u) => u.id === id);

      if (!entity) {
        throw new Error(SharedV1Errors.NotFound);
      }

      entity.archivedAt = undefined;

      return entity;
    },
    findByIdOrFail: async (id: TEntity["id"]): Promise<TEntity> => {
      const entity = entities.filter((u) => u.archivedAt == null).find((u) => u.id === id);

      if (!entity) {
        throw new Error(SharedV1Errors.NotFound);
      }

      return entity;
    },
    getRepository: (): any => {
      return mockRepository(entities);
    },
  };
}

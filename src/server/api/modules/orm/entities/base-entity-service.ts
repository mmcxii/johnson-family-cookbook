import { _BaseEntity } from "./base-entity";
import {
  EntityRepository,
  FilterQuery,
  FindOneOrFailOptions,
  FindOptions,
  QueryOrder,
  QueryOrderMap,
} from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";

/**
 * The abstract base which defines methods common to all database entity services.
 */
@Injectable()
export abstract class _BaseEntityService<TEntity extends _BaseEntity> {
  constructor(protected readonly entityRepository: EntityRepository<TEntity>) {}

  /**
   * The default properties to populate on a query to the database.
   */
  protected abstract defaultPopulate: FindOneOrFailOptions<TEntity>["populate"];

  /**
   * The default sorting order for entities returned from the database.
   */
  protected defaultOrderBy: FindOneOrFailOptions<TEntity>["populate"] = [
    {
      // @ts-expect-error -- id property exists on _BaseEntity abstract class which all entities extend.
      id: QueryOrder.DESC,
    },
  ];

  /**
   * Directly accesses the entity repository to allow for highly specific access.
   */
  public getRepository(): EntityRepository<TEntity> {
    return this.entityRepository;
  }

  /**
   * Finds a single entity using a provided set of options.
   */
  public async findOneOrFail(
    options: FilterQuery<TEntity>,
    populate: FindOneOrFailOptions<TEntity>["populate"] = this.defaultPopulate,
    orderBy: FindOneOrFailOptions<TEntity>["orderBy"] = this.defaultOrderBy,
  ): Promise<TEntity> {
    const entity = await this.entityRepository.findOneOrFail(options, { populate, orderBy });

    return entity;
  }

  /**
   * Finds a specific entity by its ID.
   */
  public async findByIdOrFail(
    id: number | string,
    populate: FindOneOrFailOptions<TEntity>["populate"] = this.defaultPopulate,
    orderBy: FindOneOrFailOptions<TEntity>["orderBy"] = this.defaultOrderBy,
  ): Promise<TEntity> {
    // The `where` contstraint must be cast as `any` to avoid a type mismatch
    const entity = await this.entityRepository.findOneOrFail({ id } as any, { populate, orderBy });

    return entity;
  }

  /**
   * Finds all entities matching a given query.
   */
  public async findMany(
    where: FilterQuery<TEntity>,
    populate: FindOptions<TEntity>["populate"] = this.defaultPopulate,
    orderBy: FindOptions<TEntity>["orderBy"] = this.defaultOrderBy,
  ): Promise<TEntity[]> {
    const entities = await this.entityRepository.find(where, {
      populate,
      orderBy,
    });

    return entities;
  }

  /**
   * Finds all of the requested entity.
   */
  public async findAll(options?: FindOptions<TEntity>): Promise<TEntity[]> {
    const entities = await this.entityRepository.findAll(options);

    return entities;
  }

  /**
   * Finds all entities that have been soft deleted.
   */
  public async findAllArchived(): Promise<TEntity[]> {
    const entities = await this.entityRepository.find({ archivedAt: { $nin: [null] } } as any, {
      filters: { softDelete: false },
    });

    return entities;
  }

  /**
   * Finds a single entity that has been soft deleted.
   */
  public async findArchivedByIdOrFail(id: number): Promise<TEntity> {
    const [entity] = await this.entityRepository.find({ id, archivedAt: { $nin: [null] } } as any, {
      filters: { softDelete: false },
    });

    return entity;
  }

  /**
   * "Soft" deletes an entity by assigning a value to its `archivedAt` property.
   */
  public async findByIdAndArchiveOrFail(id: number): Promise<TEntity> {
    const entity = await this.findByIdOrFail(id);

    entity.archivedAt = new Date();

    await this.entityRepository.persistAndFlush(entity);

    return entity;
  }

  /**
   * Unarchives an entity by resetting the `archivedAt` property to `null`.
   */
  public async findByIdAndUnarchiveOrFail(id: number): Promise<TEntity> {
    const entity = await this.findArchivedByIdOrFail(id);

    entity.archivedAt = undefined;

    await this.entityRepository.persistAndFlush(entity);

    return entity;
  }

  /**
   * Permanently deletes an entity from the database.
   */
  public async findByIdAndPermanentlyDeleteOrFail(id: number): Promise<TEntity> {
    const entity = await this.findByIdOrFail(id);

    await this.entityRepository.removeAndFlush(entity);

    return entity;
  }
}

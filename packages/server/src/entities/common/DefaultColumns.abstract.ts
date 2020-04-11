import {
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  Generated,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";

import { IDefaultColumns } from "../../types/defaultColumns.types";

/**
 * Name: default columns
 * Desc: Default columns that should exist across all entities for internal use and tracking.
 */
@ObjectType()
export abstract class DefaultColumns extends BaseEntity
  implements IDefaultColumns {
  /**
   * Name: id
   * Desc: The id is a serialized numeric identifier that is used to implement relations between tables.
   * Access: Database only.
   */
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  /**
   * Name: externalId
   * Desc: The external id is used by the api to query the database. Exposing only a randomized uuid to the API adds additional security by making the data harder to access.
   * Access: API.
   */
  @Field()
  @Generated("uuid")
  @Column("uuid", { name: "external_id" })
  externalId: string;

  /**
   * Name: createdAt
   * Desc: The created at date is a timestamp of when the record was inserted into the database.
   * Access: API.
   */
  @Field()
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  /**
   * Name: updatedAt
   * Desc: The updated at date is a timestamp of when the record was most recently updated.
   * Access: API.
   */
  @Field()
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  /**
   * Name: archivedAt
   * Desc: The archived at date is a timestamp of when the record was soft deleted or archived.
   * Access: API.
   */
  @Field(() => Date, { nullable: true })
  @DeleteDateColumn({ name: "archived_at", nullable: true })
  archivedAt: Date | null;
}

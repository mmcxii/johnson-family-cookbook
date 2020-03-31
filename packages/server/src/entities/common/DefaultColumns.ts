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
 * Default columns that should exist across all entities.
 * For internal use and tracking.
 */
@ObjectType()
export abstract class DefaultColumns extends BaseEntity
  implements IDefaultColumns {
  @PrimaryGeneratedColumn({ name: "_id_" })
  _id_: number;

  @Field()
  @Generated("uuid")
  @Column("uuid", { name: "_external_id_" })
  _externalId_: string;

  @Field()
  @CreateDateColumn({ name: "_created_at_" })
  _createdAt_: Date;

  @Field()
  @UpdateDateColumn({ name: "_updated_at_" })
  _updatedAt_: Date;

  @Field(() => Date, { nullable: true })
  @DeleteDateColumn({ name: "_archived_at_", nullable: true })
  _archivedAt_: Date | null;
}

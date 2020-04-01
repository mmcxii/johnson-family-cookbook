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
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Field()
  @Generated("uuid")
  @Column("uuid", { name: "external_id" })
  externalId: string;

  @Field()
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @Field(() => Date, { nullable: true })
  @DeleteDateColumn({ name: "archived_at", nullable: true })
  archivedAt: Date | null;
}

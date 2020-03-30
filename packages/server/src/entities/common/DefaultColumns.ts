import {
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";

/**
 * Default columns that should exist across all entities.
 * For internal use and tracking.
 */
@ObjectType()
export abstract class DefaultColumns extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn({ name: "_id_" })
  id: number;

  @Field()
  @CreateDateColumn({ name: "_created_at_" })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: "_updated_at_" })
  updatedAt: Date;

  @Field()
  @DeleteDateColumn({ name: "_archived_at_", nullable: true })
  archivedAt: Date;
}

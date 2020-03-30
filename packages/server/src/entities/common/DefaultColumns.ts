import {
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class DefaultColumns extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Field()
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @Field()
  @DeleteDateColumn({ name: "archived_at", nullable: true })
  archivedAt: Date;
}

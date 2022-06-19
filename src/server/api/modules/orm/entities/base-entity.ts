import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({
  abstract: true,
})
export class _BaseEntity {
  @PrimaryKey()
  public id: number;

  @Property({
    onCreate: () => new Date(),
  })
  public createdAt: Date;

  @Property({
    onCreate: () => new Date(),
    onUpdate: () => new Date(),
  })
  public updatedAt: Date;

  @Property({
    nullable: true,
  })
  public archivedAt?: Date;
}

import { MigrationInterface, QueryRunner } from "typeorm";

export class UserPermissionLevelOnDeleteCascade1586388421433
  implements MigrationInterface {
  name = "UserPermissionLevelOnDeleteCascade1586388421433";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_33c39279f6726e9f70d4ca1b920"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_33c39279f6726e9f70d4ca1b920" FOREIGN KEY ("permission_level_id") REFERENCES "permission_level"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_33c39279f6726e9f70d4ca1b920"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_33c39279f6726e9f70d4ca1b920" FOREIGN KEY ("permission_level_id") REFERENCES "permission_level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
  }
}

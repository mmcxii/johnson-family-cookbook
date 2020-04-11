import { MigrationInterface, QueryRunner } from "typeorm";

export class Seed1586386099327 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "gender" ("name", "code") VALUES ('M', '1'), ('F', '2'), ('O', '3')`,
    );
    await queryRunner.query(
      `INSERT INTO "permission_level" ("name", "code") VALUES ('ADMIN', '0'), ('USER', '100'), ('GUEST', '200')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "gender" WHERE "code" IN (1, 2, 3)`);
    await queryRunner.query(
      `DELETE FROM "permission_level" WHERE "code" IN (0, 100, 200)`,
    );
  }
}

import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1586385802202 implements MigrationInterface {
    name = 'Initial1586385802202';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "gender_name_enum" AS ENUM('M', 'F', 'O')`, undefined);
        await queryRunner.query(`CREATE TYPE "gender_code_enum" AS ENUM('1', '2', '3')`, undefined);
        await queryRunner.query(`CREATE TABLE "gender" ("id" SERIAL NOT NULL, "external_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "archived_at" TIMESTAMP, "name" "gender_name_enum" NOT NULL, "code" "gender_code_enum" NOT NULL, CONSTRAINT "UQ_715cef762c43bdc30e83bea1615" UNIQUE ("name"), CONSTRAINT "UQ_fd1bd0a76c4fa6e65774159c99b" UNIQUE ("code"), CONSTRAINT "PK_98a711129bc073e6312d08364e8" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TYPE "permission_level_name_enum" AS ENUM('ADMIN', 'USER', 'GUEST')`, undefined);
        await queryRunner.query(`CREATE TYPE "permission_level_code_enum" AS ENUM('0', '100', '200')`, undefined);
        await queryRunner.query(`CREATE TABLE "permission_level" ("id" SERIAL NOT NULL, "external_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "archived_at" TIMESTAMP, "name" "permission_level_name_enum" NOT NULL, "code" "permission_level_code_enum" NOT NULL, CONSTRAINT "UQ_ba4447afd028ee4796c21808b09" UNIQUE ("name"), CONSTRAINT "UQ_d6e9da90017a19592a812c05f72" UNIQUE ("code"), CONSTRAINT "PK_ae850ae9011e305782debcaa9f3" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TYPE "user_account_status_enum" AS ENUM('NOT_CONFIRMED', 'ACTIVE', 'DISABLED')`, undefined);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "external_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "archived_at" TIMESTAMP, "account_status" "user_account_status_enum" NOT NULL DEFAULT 'NOT_CONFIRMED', "permission_level_id" integer NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "token_version" integer NOT NULL DEFAULT 0, "birthday" TIMESTAMP NOT NULL, "profile_picture_url" text, "gender_id" integer NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_33c39279f6726e9f70d4ca1b920" FOREIGN KEY ("permission_level_id") REFERENCES "permission_level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_6d4390ab1c0e8c86287d9f4c430" FOREIGN KEY ("gender_id") REFERENCES "gender"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_6d4390ab1c0e8c86287d9f4c430"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_33c39279f6726e9f70d4ca1b920"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
        await queryRunner.query(`DROP TYPE "user_account_status_enum"`, undefined);
        await queryRunner.query(`DROP TABLE "permission_level"`, undefined);
        await queryRunner.query(`DROP TYPE "permission_level_code_enum"`, undefined);
        await queryRunner.query(`DROP TYPE "permission_level_name_enum"`, undefined);
        await queryRunner.query(`DROP TABLE "gender"`, undefined);
        await queryRunner.query(`DROP TYPE "gender_code_enum"`, undefined);
        await queryRunner.query(`DROP TYPE "gender_name_enum"`, undefined);
    }

}

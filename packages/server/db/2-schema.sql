/*
    These tables are depended on by the User table but should never need to be manually interacted with
*/

-- Create Gender Enum
CREATE TYPE "gender_name_enum" AS ENUM('M', 'F');

-- Create Gender Table
CREATE TABLE IF NOT EXISTS "gender" (
    "id" SERIAL NOT NULL,
    "external_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
    "archived_at" TIMESTAMP,
    "name" "gender_name_enum" NOT NULL,
    CONSTRAINT "PK_98a711129bc073e6312d08364e8" PRIMARY KEY ("id")
);

SELECT * FROM "gender";

-- Create Permission Level Enum
CREATE TYPE "permission_level_name_enum" AS ENUM('ADMIN', 'USER', 'GUEST');

-- Create Permission Level Table
CREATE TABLE "permission_level" (
    "id" SERIAL NOT NULL,
    "external_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
    "archived_at" TIMESTAMP,
    "name" "permission_level_name_enum" NOT NULL,
    CONSTRAINT "PK_ae850ae9011e305782debcaa9f3" PRIMARY KEY ("id"));

SELECT * FROM "permission_level";

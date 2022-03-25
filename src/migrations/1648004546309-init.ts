import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1648004546309 implements MigrationInterface {
  name = 'init1648004546309';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "root" ("id" SERIAL NOT NULL, "uid" character varying NOT NULL, "dateCreate" TIMESTAMP NOT NULL, "dateUpd" TIMESTAMP, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_14c24f894f0be73529176098ea5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "persData"."person" ("id" SERIAL NOT NULL, "uid" character varying NOT NULL, "dateCreate" TIMESTAMP NOT NULL, "dateUpd" TIMESTAMP, "isActive" boolean NOT NULL DEFAULT true, "im" character varying, "fam" character varying, "otch" character varying, "dateBirth" TIMESTAMP, "sex" integer, "sexText" character varying, CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "auth"."accesses" ("id" SERIAL NOT NULL, "uid" character varying NOT NULL, "dateCreate" TIMESTAMP NOT NULL, "dateUpd" TIMESTAMP, "isActive" boolean NOT NULL DEFAULT true, "parent" integer, "name" character varying NOT NULL, "targetname" character varying NOT NULL, "targetid" integer NOT NULL, "global" boolean NOT NULL DEFAULT false, "create" boolean NOT NULL DEFAULT false, "read" boolean NOT NULL DEFAULT true, "update" boolean NOT NULL DEFAULT false, "delete" boolean NOT NULL DEFAULT false, "exclude" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_576fd8c1c291f0fedd0732b0295" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "auth"."roles" ("id" SERIAL NOT NULL, "uid" character varying NOT NULL, "dateCreate" TIMESTAMP NOT NULL, "dateUpd" TIMESTAMP, "isActive" boolean NOT NULL DEFAULT true, "name" character varying NOT NULL, "title" character varying NOT NULL, "parent" integer, "nsiRoleId" integer, "nsiRoleName" character varying, "exclude" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "auth"."accaunt" ("id" SERIAL NOT NULL, "uid" character varying NOT NULL, "dateCreate" TIMESTAMP NOT NULL, "dateUpd" TIMESTAMP, "isActive" boolean NOT NULL DEFAULT true, "email" character varying NOT NULL, "phone" integer, "login" character varying NOT NULL, "password" character varying NOT NULL, "exclude" boolean NOT NULL DEFAULT false, "personId" integer, CONSTRAINT "REL_87a2c4b4c33b4731522961f76d" UNIQUE ("personId"), CONSTRAINT "PK_376e43fa2d7f4a96eaf15b51ddc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "files" ("id" SERIAL NOT NULL, "uid" character varying NOT NULL, "dateCreate" TIMESTAMP NOT NULL, "dateUpd" TIMESTAMP, "isActive" boolean NOT NULL DEFAULT true, "name" character varying NOT NULL, "originalname" character varying NOT NULL, "type" character varying NOT NULL, "path" character varying NOT NULL, "size" integer NOT NULL, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "auth"."roles_accesses_accesses" ("rolesId" integer NOT NULL, "accessesId" integer NOT NULL, CONSTRAINT "PK_ab5ec29207adb150941ca71e4dd" PRIMARY KEY ("rolesId", "accessesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9b8f10198ae5ac0f38ab325f51" ON "auth"."roles_accesses_accesses" ("rolesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_79c4b654d882c6ead68d163d29" ON "auth"."roles_accesses_accesses" ("accessesId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "auth"."accaunt_roles_roles" ("accauntId" integer NOT NULL, "rolesId" integer NOT NULL, CONSTRAINT "PK_07be33efb0789772e752dce699d" PRIMARY KEY ("accauntId", "rolesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cacd7e510e16f55e079662815c" ON "auth"."accaunt_roles_roles" ("accauntId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_50abe952ae88328b0c6064183a" ON "auth"."accaunt_roles_roles" ("rolesId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."accaunt" ADD CONSTRAINT "FK_87a2c4b4c33b4731522961f76d4" FOREIGN KEY ("personId") REFERENCES "persData"."person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."roles_accesses_accesses" ADD CONSTRAINT "FK_9b8f10198ae5ac0f38ab325f517" FOREIGN KEY ("rolesId") REFERENCES "auth"."roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."roles_accesses_accesses" ADD CONSTRAINT "FK_79c4b654d882c6ead68d163d29d" FOREIGN KEY ("accessesId") REFERENCES "auth"."accesses"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."accaunt_roles_roles" ADD CONSTRAINT "FK_cacd7e510e16f55e079662815ce" FOREIGN KEY ("accauntId") REFERENCES "auth"."accaunt"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."accaunt_roles_roles" ADD CONSTRAINT "FK_50abe952ae88328b0c6064183ab" FOREIGN KEY ("rolesId") REFERENCES "auth"."roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "auth"."accaunt_roles_roles" DROP CONSTRAINT "FK_50abe952ae88328b0c6064183ab"`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."accaunt_roles_roles" DROP CONSTRAINT "FK_cacd7e510e16f55e079662815ce"`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."roles_accesses_accesses" DROP CONSTRAINT "FK_79c4b654d882c6ead68d163d29d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."roles_accesses_accesses" DROP CONSTRAINT "FK_9b8f10198ae5ac0f38ab325f517"`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."accaunt" DROP CONSTRAINT "FK_87a2c4b4c33b4731522961f76d4"`,
    );
    await queryRunner.query(
      `DROP INDEX "auth"."IDX_50abe952ae88328b0c6064183a"`,
    );
    await queryRunner.query(
      `DROP INDEX "auth"."IDX_cacd7e510e16f55e079662815c"`,
    );
    await queryRunner.query(`DROP TABLE "auth"."accaunt_roles_roles"`);
    await queryRunner.query(
      `DROP INDEX "auth"."IDX_79c4b654d882c6ead68d163d29"`,
    );
    await queryRunner.query(
      `DROP INDEX "auth"."IDX_9b8f10198ae5ac0f38ab325f51"`,
    );
    await queryRunner.query(`DROP TABLE "auth"."roles_accesses_accesses"`);
    await queryRunner.query(`DROP TABLE "files"`);
    await queryRunner.query(`DROP TABLE "auth"."accaunt"`);
    await queryRunner.query(`DROP TABLE "auth"."roles"`);
    await queryRunner.query(`DROP TABLE "auth"."accesses"`);
    await queryRunner.query(`DROP TABLE "persData"."person"`);
    await queryRunner.query(`DROP TABLE "root"`);
  }
}

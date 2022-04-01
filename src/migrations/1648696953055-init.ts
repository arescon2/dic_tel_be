import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1648696953055 implements MigrationInterface {
  name = 'init1648696953055';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "root" ("id" SERIAL NOT NULL, "uid" character varying NOT NULL, "dateCreate" TIMESTAMP NOT NULL, "dateUpd" TIMESTAMP, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_14c24f894f0be73529176098ea5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "dics"."organization" ("id" SERIAL NOT NULL, "uid" character varying NOT NULL, "dateCreate" TIMESTAMP NOT NULL, "dateUpd" TIMESTAMP, "isActive" boolean NOT NULL DEFAULT true, "name" character varying, "short" character varying, "inn" integer NOT NULL, "ogrn" integer, "address" character varying, "index" integer, "email" character varying, "tel" character varying, "exclude" boolean NOT NULL DEFAULT false, "parentId" integer, CONSTRAINT "UQ_be5034c484f8b7c7ffa151ef9f8" UNIQUE ("inn"), CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "persData"."person" ("id" SERIAL NOT NULL, "uid" character varying NOT NULL, "dateCreate" TIMESTAMP NOT NULL, "dateUpd" TIMESTAMP, "isActive" boolean NOT NULL DEFAULT true, "im" character varying, "fam" character varying, "otch" character varying, "dateBirth" TIMESTAMP, "sex" integer, "sexText" character varying, "organizationId" integer, CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "auth"."accesses" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "url" character varying NOT NULL, CONSTRAINT "PK_576fd8c1c291f0fedd0732b0295" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "auth"."roles" ("id" SERIAL NOT NULL, "uid" character varying NOT NULL, "dateCreate" TIMESTAMP NOT NULL, "dateUpd" TIMESTAMP, "isActive" boolean NOT NULL DEFAULT true, "name" character varying NOT NULL, "title" character varying NOT NULL, "parent" integer, "exclude" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "auth"."apps" ("id" SERIAL NOT NULL, "uid" character varying NOT NULL, "name" character varying NOT NULL, "descr" character varying, "exclude" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_c5121fda0f8268f1f7f84134e19" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "auth"."accaunt" ("id" SERIAL NOT NULL, "uid" character varying NOT NULL, "dateCreate" TIMESTAMP NOT NULL, "dateUpd" TIMESTAMP, "isActive" boolean NOT NULL DEFAULT true, "email" character varying NOT NULL, "phone" integer, "login" character varying NOT NULL, "password" character varying NOT NULL, "exclude" boolean NOT NULL DEFAULT false, "personId" integer, CONSTRAINT "UQ_efbfddcd76e65522ae5783dc782" UNIQUE ("email"), CONSTRAINT "UQ_f705a393b1bb532bd1a798b595e" UNIQUE ("phone"), CONSTRAINT "UQ_6f950202b0da031b95edcf04aa9" UNIQUE ("login"), CONSTRAINT "REL_87a2c4b4c33b4731522961f76d" UNIQUE ("personId"), CONSTRAINT "PK_376e43fa2d7f4a96eaf15b51ddc" PRIMARY KEY ("id"))`,
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
      `CREATE TABLE "auth"."accaunt_apps_apps" ("accauntId" integer NOT NULL, "appsId" integer NOT NULL, CONSTRAINT "PK_132cd4272a4cca1ce3d8e1761e8" PRIMARY KEY ("accauntId", "appsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d5321fe58d6a1eabef5990a681" ON "auth"."accaunt_apps_apps" ("accauntId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8fdf0b295d083746ac3b9471ad" ON "auth"."accaunt_apps_apps" ("appsId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "organization_closure" ("id_ancestor" integer NOT NULL, "id_descendant" integer NOT NULL, CONSTRAINT "PK_f1dc89a7f3c5b2f73329776e069" PRIMARY KEY ("id_ancestor", "id_descendant"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ea74b7c4a55b7887af4470ea46" ON "organization_closure" ("id_ancestor") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f51963aac115d526960ac74cf2" ON "organization_closure" ("id_descendant") `,
    );
    await queryRunner.query(
      `ALTER TABLE "dics"."organization" ADD CONSTRAINT "FK_da6c3ae56a0c3fc3ce81b0e90a6" FOREIGN KEY ("parentId") REFERENCES "dics"."organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "persData"."person" ADD CONSTRAINT "FK_a868033263d1c7e1e586e5b4d25" FOREIGN KEY ("organizationId") REFERENCES "dics"."organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
    await queryRunner.query(
      `ALTER TABLE "auth"."accaunt_apps_apps" ADD CONSTRAINT "FK_d5321fe58d6a1eabef5990a6813" FOREIGN KEY ("accauntId") REFERENCES "auth"."accaunt"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."accaunt_apps_apps" ADD CONSTRAINT "FK_8fdf0b295d083746ac3b9471ad1" FOREIGN KEY ("appsId") REFERENCES "auth"."apps"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_closure" ADD CONSTRAINT "FK_ea74b7c4a55b7887af4470ea468" FOREIGN KEY ("id_ancestor") REFERENCES "dics"."organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_closure" ADD CONSTRAINT "FK_f51963aac115d526960ac74cf2f" FOREIGN KEY ("id_descendant") REFERENCES "dics"."organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "organization_closure" DROP CONSTRAINT "FK_f51963aac115d526960ac74cf2f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_closure" DROP CONSTRAINT "FK_ea74b7c4a55b7887af4470ea468"`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."accaunt_apps_apps" DROP CONSTRAINT "FK_8fdf0b295d083746ac3b9471ad1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."accaunt_apps_apps" DROP CONSTRAINT "FK_d5321fe58d6a1eabef5990a6813"`,
    );
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
      `ALTER TABLE "persData"."person" DROP CONSTRAINT "FK_a868033263d1c7e1e586e5b4d25"`,
    );
    await queryRunner.query(
      `ALTER TABLE "dics"."organization" DROP CONSTRAINT "FK_da6c3ae56a0c3fc3ce81b0e90a6"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_f51963aac115d526960ac74cf2"`);
    await queryRunner.query(`DROP INDEX "IDX_ea74b7c4a55b7887af4470ea46"`);
    await queryRunner.query(`DROP TABLE "organization_closure"`);
    await queryRunner.query(
      `DROP INDEX "auth"."IDX_8fdf0b295d083746ac3b9471ad"`,
    );
    await queryRunner.query(
      `DROP INDEX "auth"."IDX_d5321fe58d6a1eabef5990a681"`,
    );
    await queryRunner.query(`DROP TABLE "auth"."accaunt_apps_apps"`);
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
    await queryRunner.query(`DROP TABLE "auth"."apps"`);
    await queryRunner.query(`DROP TABLE "auth"."roles"`);
    await queryRunner.query(`DROP TABLE "auth"."accesses"`);
    await queryRunner.query(`DROP TABLE "persData"."person"`);
    await queryRunner.query(`DROP TABLE "dics"."organization"`);
    await queryRunner.query(`DROP TABLE "root"`);
  }
}

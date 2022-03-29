import { MigrationInterface, QueryRunner } from 'typeorm';

export class addAppsAndfixRoles1648457470755 implements MigrationInterface {
  name = 'addAppsAndfixRoles1648457470755';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "auth"."apps" ("id" SERIAL NOT NULL, "uid" character varying NOT NULL, "name" character varying NOT NULL, "descr" character varying, "exclude" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_c5121fda0f8268f1f7f84134e19" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "auth"."roles_apps_apps" ("rolesId" integer NOT NULL, "appsId" integer NOT NULL, CONSTRAINT "PK_7019cdd376f9957a829fb805034" PRIMARY KEY ("rolesId", "appsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bf6cd319c24f6bad3bf8096caa" ON "auth"."roles_apps_apps" ("rolesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_14a3f62315fa25c1d3dc9f5fe2" ON "auth"."roles_apps_apps" ("appsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."roles" DROP COLUMN "nsiRoleId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."roles" DROP COLUMN "nsiRoleName"`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."roles_apps_apps" ADD CONSTRAINT "FK_bf6cd319c24f6bad3bf8096caad" FOREIGN KEY ("rolesId") REFERENCES "auth"."roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."roles_apps_apps" ADD CONSTRAINT "FK_14a3f62315fa25c1d3dc9f5fe25" FOREIGN KEY ("appsId") REFERENCES "auth"."apps"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "auth"."roles_apps_apps" DROP CONSTRAINT "FK_14a3f62315fa25c1d3dc9f5fe25"`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."roles_apps_apps" DROP CONSTRAINT "FK_bf6cd319c24f6bad3bf8096caad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."roles" ADD "nsiRoleName" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."roles" ADD "nsiRoleId" integer`,
    );
    await queryRunner.query(
      `DROP INDEX "auth"."IDX_14a3f62315fa25c1d3dc9f5fe2"`,
    );
    await queryRunner.query(
      `DROP INDEX "auth"."IDX_bf6cd319c24f6bad3bf8096caa"`,
    );
    await queryRunner.query(`DROP TABLE "auth"."roles_apps_apps"`);
    await queryRunner.query(`DROP TABLE "auth"."apps"`);
  }
}

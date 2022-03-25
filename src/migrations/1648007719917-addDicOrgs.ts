import { MigrationInterface, QueryRunner } from 'typeorm';

export class addDicOrgs1648007719917 implements MigrationInterface {
  name = 'addDicOrgs1648007719917';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "dics"."organization" ("id" SERIAL NOT NULL, "uid" character varying NOT NULL, "dateCreate" TIMESTAMP NOT NULL, "dateUpd" TIMESTAMP, "isActive" boolean NOT NULL DEFAULT true, "name" character varying, "inn" integer, "ogrn" integer, "address" character varying, "index" integer, "email" character varying, "tel" character varying, "exclude" boolean NOT NULL DEFAULT false, "parentId" integer, CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id"))`,
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
      `ALTER TABLE "dics"."organization" DROP CONSTRAINT "FK_da6c3ae56a0c3fc3ce81b0e90a6"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_f51963aac115d526960ac74cf2"`);
    await queryRunner.query(`DROP INDEX "IDX_ea74b7c4a55b7887af4470ea46"`);
    await queryRunner.query(`DROP TABLE "organization_closure"`);
    await queryRunner.query(`DROP TABLE "dics"."organization"`);
  }
}

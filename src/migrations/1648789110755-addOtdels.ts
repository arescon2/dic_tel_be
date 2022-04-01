import { MigrationInterface, QueryRunner } from 'typeorm';

export class addOtdels1648789110755 implements MigrationInterface {
  name = 'addOtdels1648789110755';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "dics"."otdels" ("id" SERIAL NOT NULL, "name" character varying, "organizationId" integer, CONSTRAINT "PK_f85c0cdb0d7d81346feb44d683d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "dics"."otdels" ADD CONSTRAINT "FK_6e1bb6aebe500416d104a731a9d" FOREIGN KEY ("organizationId") REFERENCES "dics"."organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dics"."otdels" DROP CONSTRAINT "FK_6e1bb6aebe500416d104a731a9d"`,
    );
    await queryRunner.query(`DROP TABLE "dics"."otdels"`);
  }
}

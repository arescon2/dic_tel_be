import { MigrationInterface, QueryRunner } from 'typeorm';

export class otdelsAndFixes1649125393466 implements MigrationInterface {
  name = 'otdelsAndFixes1649125393466';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "dics"."posts" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "dics"."field_dic" ("id" SERIAL NOT NULL, "fio" character varying NOT NULL, "mobile" integer NOT NULL, "worktel" integer NOT NULL, "email" character varying NOT NULL, "otdelId" integer, CONSTRAINT "PK_750da9944744442595085f92996" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "dics"."field_dic" ADD CONSTRAINT "FK_8ecea036b3dcc91dc9d39ffbc39" FOREIGN KEY ("otdelId") REFERENCES "dics"."otdels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dics"."field_dic" DROP CONSTRAINT "FK_8ecea036b3dcc91dc9d39ffbc39"`,
    );
    await queryRunner.query(`DROP TABLE "dics"."field_dic"`);
    await queryRunner.query(`DROP TABLE "dics"."posts"`);
  }
}

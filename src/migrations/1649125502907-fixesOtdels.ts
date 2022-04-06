import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixesOtdels1649125502907 implements MigrationInterface {
  name = 'fixesOtdels1649125502907';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dics"."field_dic" ADD "uid" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "dics"."field_dic" ADD "dateCreate" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "dics"."field_dic" ADD "dateUpd" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "dics"."field_dic" ADD "isActive" boolean NOT NULL DEFAULT true`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dics"."field_dic" DROP COLUMN "isActive"`,
    );
    await queryRunner.query(
      `ALTER TABLE "dics"."field_dic" DROP COLUMN "dateUpd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "dics"."field_dic" DROP COLUMN "dateCreate"`,
    );
    await queryRunner.query(`ALTER TABLE "dics"."field_dic" DROP COLUMN "uid"`);
  }
}

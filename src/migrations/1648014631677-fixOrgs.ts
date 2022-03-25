import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixOrgs1648014631677 implements MigrationInterface {
  name = 'fixOrgs1648014631677';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dics"."organization" ALTER COLUMN "inn" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "dics"."organization" ADD CONSTRAINT "UQ_be5034c484f8b7c7ffa151ef9f8" UNIQUE ("inn")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dics"."organization" DROP CONSTRAINT "UQ_be5034c484f8b7c7ffa151ef9f8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "dics"."organization" ALTER COLUMN "inn" DROP NOT NULL`,
    );
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class addOrgForPerson1648195711574 implements MigrationInterface {
  name = 'addOrgForPerson1648195711574';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "auth"."accaunt" ADD "organizationId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."accaunt" ADD CONSTRAINT "UQ_4f8252dad3d6bf639041663f1f2" UNIQUE ("organizationId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."accaunt" ADD CONSTRAINT "FK_4f8252dad3d6bf639041663f1f2" FOREIGN KEY ("organizationId") REFERENCES "dics"."organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "auth"."accaunt" DROP CONSTRAINT "FK_4f8252dad3d6bf639041663f1f2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."accaunt" DROP CONSTRAINT "UQ_4f8252dad3d6bf639041663f1f2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."accaunt" DROP COLUMN "organizationId"`,
    );
  }
}

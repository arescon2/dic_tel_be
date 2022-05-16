import { MigrationInterface, QueryRunner } from 'typeorm';

export class issueFix1651049103096 implements MigrationInterface {
  name = 'issueFix1651049103096';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tickets"."issue" ADD "organizationId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "tickets"."issue" ADD CONSTRAINT "FK_d76de436608d7b35f2da365a7ca" FOREIGN KEY ("organizationId") REFERENCES "dics"."organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tickets"."issue" DROP CONSTRAINT "FK_d76de436608d7b35f2da365a7ca"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tickets"."issue" DROP COLUMN "organizationId"`,
    );
  }
}

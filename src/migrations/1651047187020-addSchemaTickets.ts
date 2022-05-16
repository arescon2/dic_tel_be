import { MigrationInterface, QueryRunner } from 'typeorm';

export class addSchemaTickets1651047187020 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SCHEMA "tickets"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP SCHEMA "tickets"`);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class createAuthSchema1644337754661 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SCHEMA "auth"`);
    await queryRunner.query(`CREATE SCHEMA "priem"`);
    await queryRunner.query(`CREATE SCHEMA "persData"`);
    await queryRunner.query(`CREATE SCHEMA "dics"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP SCHEMA "auth"`);
    await queryRunner.query(`DROP SCHEMA "priem"`);
    await queryRunner.query(`DROP SCHEMA "persData"`);
    await queryRunner.query(`DROP SCHEMA "dics"`);
  }
}

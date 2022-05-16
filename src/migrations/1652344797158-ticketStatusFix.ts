import {MigrationInterface, QueryRunner} from "typeorm";

export class ticketStatusFix1652344797158 implements MigrationInterface {
    name = 'ticketStatusFix1652344797158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dics"."status_ticket" ADD "main" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dics"."status_ticket" DROP COLUMN "main"`);
    }

}

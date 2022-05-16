import {MigrationInterface, QueryRunner} from "typeorm";

export class statusTicketFix1651207602322 implements MigrationInterface {
    name = 'statusTicketFix1651207602322'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dics"."status_ticket" ADD "color" character varying`);
        await queryRunner.query(`ALTER TABLE "dics"."status_ticket" ADD "code" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dics"."status_ticket" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "dics"."status_ticket" DROP COLUMN "color"`);
    }

}

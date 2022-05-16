import {MigrationInterface, QueryRunner} from "typeorm";

export class issueAddClosedFlag1652667256878 implements MigrationInterface {
    name = 'issueAddClosedFlag1652667256878'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tickets"."issue" ADD "closed" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tickets"."issue" DROP COLUMN "closed"`);
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class ticketTypes1650957715421 implements MigrationInterface {
    name = 'ticketTypes1650957715421'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dics"."type_ticket" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_212f664e3b503c32ace93868039" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "dics"."type_ticket"`);
    }

}

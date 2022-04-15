import {MigrationInterface, QueryRunner} from "typeorm";

export class dicsicket1649906477605 implements MigrationInterface {
    name = 'dicsicket1649906477605'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dics"."category_ticket" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e81f1f5b845b7b543f88a2751c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dics"."status_ticket" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_62ed7d9e20359fe93fe7dab3a55" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "dics"."status_ticket"`);
        await queryRunner.query(`DROP TABLE "dics"."category_ticket"`);
    }

}

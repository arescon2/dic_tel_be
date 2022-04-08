import {MigrationInterface, QueryRunner} from "typeorm";

export class fixmployee1649316270748 implements MigrationInterface {
    name = 'fixmployee1649316270748'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dics"."employee" DROP COLUMN "mobile"`);
        await queryRunner.query(`ALTER TABLE "dics"."employee" ADD "mobile" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dics"."employee" DROP COLUMN "worktel"`);
        await queryRunner.query(`ALTER TABLE "dics"."employee" ADD "worktel" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dics"."employee" DROP COLUMN "worktel"`);
        await queryRunner.query(`ALTER TABLE "dics"."employee" ADD "worktel" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dics"."employee" DROP COLUMN "mobile"`);
        await queryRunner.query(`ALTER TABLE "dics"."employee" ADD "mobile" integer NOT NULL`);
    }

}

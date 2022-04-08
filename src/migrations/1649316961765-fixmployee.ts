import {MigrationInterface, QueryRunner} from "typeorm";

export class fixmployee1649316961765 implements MigrationInterface {
    name = 'fixmployee1649316961765'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dics"."employee" ALTER COLUMN "email" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dics"."employee" ALTER COLUMN "email" SET NOT NULL`);
    }

}

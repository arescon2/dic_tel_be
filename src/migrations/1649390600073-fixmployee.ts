import {MigrationInterface, QueryRunner} from "typeorm";

export class fixmployee1649390600073 implements MigrationInterface {
    name = 'fixmployee1649390600073'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dics"."employee" DROP COLUMN "fio"`);
        await queryRunner.query(`ALTER TABLE "dics"."employee" ADD "fam" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dics"."employee" ADD "im" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dics"."employee" ADD "otch" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dics"."employee" DROP COLUMN "otch"`);
        await queryRunner.query(`ALTER TABLE "dics"."employee" DROP COLUMN "im"`);
        await queryRunner.query(`ALTER TABLE "dics"."employee" DROP COLUMN "fam"`);
        await queryRunner.query(`ALTER TABLE "dics"."employee" ADD "fio" character varying NOT NULL`);
    }

}

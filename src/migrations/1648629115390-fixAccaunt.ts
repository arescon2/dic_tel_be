import {MigrationInterface, QueryRunner} from "typeorm";

export class fixAccaunt1648629115390 implements MigrationInterface {
    name = 'fixAccaunt1648629115390'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth"."accaunt" ADD CONSTRAINT "UQ_efbfddcd76e65522ae5783dc782" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "auth"."accaunt" ADD CONSTRAINT "UQ_f705a393b1bb532bd1a798b595e" UNIQUE ("phone")`);
        await queryRunner.query(`ALTER TABLE "auth"."accaunt" ADD CONSTRAINT "UQ_6f950202b0da031b95edcf04aa9" UNIQUE ("login")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth"."accaunt" DROP CONSTRAINT "UQ_6f950202b0da031b95edcf04aa9"`);
        await queryRunner.query(`ALTER TABLE "auth"."accaunt" DROP CONSTRAINT "UQ_f705a393b1bb532bd1a798b595e"`);
        await queryRunner.query(`ALTER TABLE "auth"."accaunt" DROP CONSTRAINT "UQ_efbfddcd76e65522ae5783dc782"`);
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class fixmployee1649391986343 implements MigrationInterface {
    name = 'fixmployee1649391986343'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dics"."employee" DROP CONSTRAINT "FK_aff396af6e595420a64943f4c26"`);
        await queryRunner.query(`ALTER TABLE "dics"."employee" DROP CONSTRAINT "REL_aff396af6e595420a64943f4c2"`);
        await queryRunner.query(`ALTER TABLE "dics"."employee" ADD CONSTRAINT "FK_aff396af6e595420a64943f4c26" FOREIGN KEY ("positionId") REFERENCES "dics"."posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dics"."employee" DROP CONSTRAINT "FK_aff396af6e595420a64943f4c26"`);
        await queryRunner.query(`ALTER TABLE "dics"."employee" ADD CONSTRAINT "REL_aff396af6e595420a64943f4c2" UNIQUE ("positionId")`);
        await queryRunner.query(`ALTER TABLE "dics"."employee" ADD CONSTRAINT "FK_aff396af6e595420a64943f4c26" FOREIGN KEY ("positionId") REFERENCES "dics"."posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

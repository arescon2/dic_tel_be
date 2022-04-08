import {MigrationInterface, QueryRunner} from "typeorm";

export class fixmployee1649298408310 implements MigrationInterface {
    name = 'fixmployee1649298408310'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dics"."employee" ("id" SERIAL NOT NULL, "uid" character varying NOT NULL, "dateCreate" TIMESTAMP NOT NULL, "dateUpd" TIMESTAMP, "isActive" boolean NOT NULL DEFAULT true, "fio" character varying NOT NULL, "mobile" integer NOT NULL, "worktel" integer NOT NULL, "email" character varying NOT NULL, "positionId" integer, "otdelId" integer, CONSTRAINT "REL_aff396af6e595420a64943f4c2" UNIQUE ("positionId"), CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "dics"."employee" ADD CONSTRAINT "FK_aff396af6e595420a64943f4c26" FOREIGN KEY ("positionId") REFERENCES "dics"."posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dics"."employee" ADD CONSTRAINT "FK_020e6fc160311040aefe619d595" FOREIGN KEY ("otdelId") REFERENCES "dics"."otdels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dics"."employee" DROP CONSTRAINT "FK_020e6fc160311040aefe619d595"`);
        await queryRunner.query(`ALTER TABLE "dics"."employee" DROP CONSTRAINT "FK_aff396af6e595420a64943f4c26"`);
        await queryRunner.query(`DROP TABLE "dics"."employee"`);
    }

}

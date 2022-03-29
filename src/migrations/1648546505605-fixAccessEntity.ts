import {MigrationInterface, QueryRunner} from "typeorm";

export class fixAccessEntity1648546505605 implements MigrationInterface {
    name = 'fixAccessEntity1648546505605'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth"."accesses" DROP COLUMN "dateCreate"`);
        await queryRunner.query(`ALTER TABLE "auth"."accesses" DROP COLUMN "dateUpd"`);
        await queryRunner.query(`ALTER TABLE "auth"."accesses" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "auth"."accesses" DROP COLUMN "parent"`);
        await queryRunner.query(`ALTER TABLE "auth"."accesses" DROP COLUMN "targetid"`);
        await queryRunner.query(`ALTER TABLE "auth"."accesses" DROP COLUMN "global"`);
        await queryRunner.query(`ALTER TABLE "auth"."accesses" DROP COLUMN "exclude"`);
        await queryRunner.query(`ALTER TABLE "auth"."accesses" DROP COLUMN "uid"`);
        await queryRunner.query(`ALTER TABLE "auth"."accesses" DROP COLUMN "targetname"`);
        await queryRunner.query(`ALTER TABLE "auth"."accesses" ADD "url" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth"."accesses" DROP COLUMN "url"`);
        await queryRunner.query(`ALTER TABLE "auth"."accesses" ADD "targetname" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "auth"."accesses" ADD "uid" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "auth"."accesses" ADD "exclude" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "auth"."accesses" ADD "global" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "auth"."accesses" ADD "targetid" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "auth"."accesses" ADD "parent" integer`);
        await queryRunner.query(`ALTER TABLE "auth"."accesses" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "auth"."accesses" ADD "dateUpd" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "auth"."accesses" ADD "dateCreate" TIMESTAMP NOT NULL`);
    }

}

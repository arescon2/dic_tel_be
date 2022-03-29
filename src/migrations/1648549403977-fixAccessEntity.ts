import {MigrationInterface, QueryRunner} from "typeorm";

export class fixAccessEntity1648549403977 implements MigrationInterface {
    name = 'fixAccessEntity1648549403977'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth"."accesses" DROP COLUMN "create"`);
        await queryRunner.query(`ALTER TABLE "auth"."accesses" DROP COLUMN "read"`);
        await queryRunner.query(`ALTER TABLE "auth"."accesses" DROP COLUMN "update"`);
        await queryRunner.query(`ALTER TABLE "auth"."accesses" DROP COLUMN "delete"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth"."accesses" ADD "delete" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "auth"."accesses" ADD "update" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "auth"."accesses" ADD "read" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "auth"."accesses" ADD "create" boolean NOT NULL DEFAULT false`);
    }

}

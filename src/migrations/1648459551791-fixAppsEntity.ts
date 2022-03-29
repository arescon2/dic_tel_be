import {MigrationInterface, QueryRunner} from "typeorm";

export class fixAppsEntity1648459551791 implements MigrationInterface {
    name = 'fixAppsEntity1648459551791'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "auth"."accaunt_apps_apps" ("accauntId" integer NOT NULL, "appsId" integer NOT NULL, CONSTRAINT "PK_132cd4272a4cca1ce3d8e1761e8" PRIMARY KEY ("accauntId", "appsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d5321fe58d6a1eabef5990a681" ON "auth"."accaunt_apps_apps" ("accauntId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8fdf0b295d083746ac3b9471ad" ON "auth"."accaunt_apps_apps" ("appsId") `);
        await queryRunner.query(`ALTER TABLE "auth"."accaunt_apps_apps" ADD CONSTRAINT "FK_d5321fe58d6a1eabef5990a6813" FOREIGN KEY ("accauntId") REFERENCES "auth"."accaunt"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "auth"."accaunt_apps_apps" ADD CONSTRAINT "FK_8fdf0b295d083746ac3b9471ad1" FOREIGN KEY ("appsId") REFERENCES "auth"."apps"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth"."accaunt_apps_apps" DROP CONSTRAINT "FK_8fdf0b295d083746ac3b9471ad1"`);
        await queryRunner.query(`ALTER TABLE "auth"."accaunt_apps_apps" DROP CONSTRAINT "FK_d5321fe58d6a1eabef5990a6813"`);
        await queryRunner.query(`DROP INDEX "auth"."IDX_8fdf0b295d083746ac3b9471ad"`);
        await queryRunner.query(`DROP INDEX "auth"."IDX_d5321fe58d6a1eabef5990a681"`);
        await queryRunner.query(`DROP TABLE "auth"."accaunt_apps_apps"`);
    }

}

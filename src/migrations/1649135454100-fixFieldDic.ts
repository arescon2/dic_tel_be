import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixFieldDic1649135454100 implements MigrationInterface {
  name = 'fixFieldDic1649135454100';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dics"."field_dic" ADD "positionId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "dics"."field_dic" ADD CONSTRAINT "UQ_78eb790e93a9ac5f60447812487" UNIQUE ("positionId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "dics"."field_dic" ADD CONSTRAINT "FK_78eb790e93a9ac5f60447812487" FOREIGN KEY ("positionId") REFERENCES "dics"."posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dics"."field_dic" DROP CONSTRAINT "FK_78eb790e93a9ac5f60447812487"`,
    );
    await queryRunner.query(
      `ALTER TABLE "dics"."field_dic" DROP CONSTRAINT "UQ_78eb790e93a9ac5f60447812487"`,
    );
    await queryRunner.query(
      `ALTER TABLE "dics"."field_dic" DROP COLUMN "positionId"`,
    );
  }
}

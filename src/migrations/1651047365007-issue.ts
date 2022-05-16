import { MigrationInterface, QueryRunner } from 'typeorm';

export class issue1651047365007 implements MigrationInterface {
  name = 'issue1651047365007';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tickets"."comment" ("id" SERIAL NOT NULL, "dateCreate" TIMESTAMP NOT NULL, "text" character varying NOT NULL, "authorId" integer, "issueId" integer, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tickets"."issue" ("id" SERIAL NOT NULL, "uid" character varying NOT NULL, "dateCreate" TIMESTAMP NOT NULL, "dateUpd" TIMESTAMP, "isActive" boolean NOT NULL DEFAULT true, "title" character varying NOT NULL, "descr" character varying, "authorId" integer, "responderId" integer, "typeId" integer, "categoryId" integer, "statusId" integer, CONSTRAINT "PK_f80e086c249b9f3f3ff2fd321b7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "tickets"."comment" ADD CONSTRAINT "FK_276779da446413a0d79598d4fbd" FOREIGN KEY ("authorId") REFERENCES "persData"."person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tickets"."comment" ADD CONSTRAINT "FK_c91b5a63310845bdeca63d9ee13" FOREIGN KEY ("issueId") REFERENCES "tickets"."issue"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tickets"."issue" ADD CONSTRAINT "FK_0afd9b73442e8fcc3c2d13007b6" FOREIGN KEY ("authorId") REFERENCES "persData"."person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tickets"."issue" ADD CONSTRAINT "FK_024d0d19dd21be25aeba1773807" FOREIGN KEY ("responderId") REFERENCES "persData"."person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tickets"."issue" ADD CONSTRAINT "FK_9c4834e0a4c2b4df6bdb909963c" FOREIGN KEY ("typeId") REFERENCES "dics"."type_ticket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tickets"."issue" ADD CONSTRAINT "FK_55ac7f9832e363445ccd0086909" FOREIGN KEY ("categoryId") REFERENCES "dics"."category_ticket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tickets"."issue" ADD CONSTRAINT "FK_52c8d78dbdd22b94962bcde18db" FOREIGN KEY ("statusId") REFERENCES "dics"."status_ticket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tickets"."issue" DROP CONSTRAINT "FK_52c8d78dbdd22b94962bcde18db"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tickets"."issue" DROP CONSTRAINT "FK_55ac7f9832e363445ccd0086909"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tickets"."issue" DROP CONSTRAINT "FK_9c4834e0a4c2b4df6bdb909963c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tickets"."issue" DROP CONSTRAINT "FK_024d0d19dd21be25aeba1773807"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tickets"."issue" DROP CONSTRAINT "FK_0afd9b73442e8fcc3c2d13007b6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tickets"."comment" DROP CONSTRAINT "FK_c91b5a63310845bdeca63d9ee13"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tickets"."comment" DROP CONSTRAINT "FK_276779da446413a0d79598d4fbd"`,
    );
    await queryRunner.query(`DROP TABLE "tickets"."issue"`);
    await queryRunner.query(`DROP TABLE "tickets"."comment"`);
  }
}

import { MigrationInterface, QueryRunner } from "typeorm";

export class ProfileMatchesMigration1676589770005 implements MigrationInterface {
    name = 'ProfileMatchesMigration1676589770005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "match" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_92b6c3a6631dd5b24a67c69f69d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profile_matches_match" ("profileId" integer NOT NULL, "matchId" integer NOT NULL, CONSTRAINT "PK_be67fd443aa2f4141a6e8f302b7" PRIMARY KEY ("profileId", "matchId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2668d7825e0ee28c20b3fd6bb1" ON "profile_matches_match" ("profileId") `);
        await queryRunner.query(`CREATE INDEX "IDX_893672da9f3035bbe396a8aca9" ON "profile_matches_match" ("matchId") `);
        await queryRunner.query(`CREATE TABLE "profile_matched_match" ("profileId" integer NOT NULL, "matchId" integer NOT NULL, CONSTRAINT "PK_2d9effdb2964b51f4b64e772f25" PRIMARY KEY ("profileId", "matchId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c5fa48bff47b7b86d2878b1f25" ON "profile_matched_match" ("profileId") `);
        await queryRunner.query(`CREATE INDEX "IDX_db32a8fa88b1d1c0fec5fececf" ON "profile_matched_match" ("matchId") `);
        await queryRunner.query(`ALTER TABLE "profile_matches_match" ADD CONSTRAINT "FK_2668d7825e0ee28c20b3fd6bb14" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "profile_matches_match" ADD CONSTRAINT "FK_893672da9f3035bbe396a8aca9a" FOREIGN KEY ("matchId") REFERENCES "match"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "profile_matched_match" ADD CONSTRAINT "FK_c5fa48bff47b7b86d2878b1f252" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "profile_matched_match" ADD CONSTRAINT "FK_db32a8fa88b1d1c0fec5fececf0" FOREIGN KEY ("matchId") REFERENCES "match"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile_matched_match" DROP CONSTRAINT "FK_db32a8fa88b1d1c0fec5fececf0"`);
        await queryRunner.query(`ALTER TABLE "profile_matched_match" DROP CONSTRAINT "FK_c5fa48bff47b7b86d2878b1f252"`);
        await queryRunner.query(`ALTER TABLE "profile_matches_match" DROP CONSTRAINT "FK_893672da9f3035bbe396a8aca9a"`);
        await queryRunner.query(`ALTER TABLE "profile_matches_match" DROP CONSTRAINT "FK_2668d7825e0ee28c20b3fd6bb14"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_db32a8fa88b1d1c0fec5fececf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c5fa48bff47b7b86d2878b1f25"`);
        await queryRunner.query(`DROP TABLE "profile_matched_match"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_893672da9f3035bbe396a8aca9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2668d7825e0ee28c20b3fd6bb1"`);
        await queryRunner.query(`DROP TABLE "profile_matches_match"`);
        await queryRunner.query(`DROP TABLE "match"`);
    }

}

import TypeORM from "typeorm";

export class AddedTransactions1677614312887 implements TypeORM.MigrationInterface {
    name = 'AddedTransactions1677614312887'

    public async up(queryRunner: TypeORM.QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "FK_a24972ebd73b106250713dcddd9"`);
        await queryRunner.query(`ALTER TABLE "profile" RENAME COLUMN "userId" TO "ownerId"`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" SERIAL NOT NULL, "numberSold" integer NOT NULL, "priceSold" integer NOT NULL, "profits" integer NOT NULL, "sellerId" integer, "hostId" integer, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_5848e57fcb8971eeb768c3a6b44" FOREIGN KEY ("sellerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_f2bd1e20cb24af4b3baceb84c5e" FOREIGN KEY ("hostId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "FK_552aa6698bb78970f6569161ec0" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: TypeORM.QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "FK_552aa6698bb78970f6569161ec0"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_f2bd1e20cb24af4b3baceb84c5e"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_5848e57fcb8971eeb768c3a6b44"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`ALTER TABLE "profile" RENAME COLUMN "ownerId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "FK_a24972ebd73b106250713dcddd9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}

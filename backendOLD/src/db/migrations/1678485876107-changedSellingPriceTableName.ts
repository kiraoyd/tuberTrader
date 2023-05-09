import TypeORM from "typeorm";

export class changedSellingPriceTableName1678485876107 implements TypeORM.MigrationInterface {
    name = 'changedSellingPriceTableName1678485876107'

    public async up(queryRunner: TypeORM.QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sellingPriceHistory" ("id" SERIAL NOT NULL, "priceAM" integer NOT NULL, "pricePM" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "islandId" integer, CONSTRAINT "PK_714a0b315f4437c4b9e4b26cbbb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sellingPriceHistory" ADD CONSTRAINT "FK_34217eb42084ea23fb2743ea2b3" FOREIGN KEY ("islandId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: TypeORM.QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sellingPriceHistory" DROP CONSTRAINT "FK_34217eb42084ea23fb2743ea2b3"`);
        await queryRunner.query(`DROP TABLE "sellingPriceHistory"`);
    }

}

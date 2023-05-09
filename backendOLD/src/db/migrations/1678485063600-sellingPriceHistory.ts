import TypeORM from "typeorm";

export class sellingPriceHistory1678485063600 implements TypeORM.MigrationInterface {
    name = 'sellingPriceHistory1678485063600'

    public async up(queryRunner: TypeORM.QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "weeklySales" ("id" SERIAL NOT NULL, "priceAM" integer NOT NULL, "pricePM" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "islandId" integer, CONSTRAINT "PK_e5a6e7e1b53798edc210760e805" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "weeklySales" ADD CONSTRAINT "FK_42bb78131c1eb554d296765b692" FOREIGN KEY ("islandId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: TypeORM.QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "weeklySales" DROP CONSTRAINT "FK_42bb78131c1eb554d296765b692"`);
        await queryRunner.query(`DROP TABLE "weeklySales"`);
    }

}

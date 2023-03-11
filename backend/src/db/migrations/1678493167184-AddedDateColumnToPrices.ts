import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedDateColumnToPrices1678493167184 implements MigrationInterface {
    name = 'AddedDateColumnToPrices1678493167184'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sellingPriceHistory" ADD "date" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sellingPriceHistory" ALTER COLUMN "priceAM" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "sellingPriceHistory" ALTER COLUMN "pricePM" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sellingPriceHistory" ALTER COLUMN "pricePM" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "sellingPriceHistory" ALTER COLUMN "priceAM" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "sellingPriceHistory" DROP COLUMN "date"`);
    }

}

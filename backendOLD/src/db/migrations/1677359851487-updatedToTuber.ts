import TypeORM from "typeorm";

export class updatedToTuber1677359851487 implements TypeORM.MigrationInterface {
    name = 'updatedToTuber1677359851487'

    public async up(queryRunner: TypeORM.QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "islandName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "turnipsHeld" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "pricePaid" integer NOT NULL`);
    }

    public async down(queryRunner: TypeORM.QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "pricePaid"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "turnipsHeld"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "islandName"`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "name" character varying NOT NULL`);
    }

}

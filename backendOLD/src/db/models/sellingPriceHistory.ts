/** @module Models/sellingPricesThisWeek */
import TypeORM from "typeorm";

import {Profile} from "./profile"


/**
 * class representing SellingPriceHistory table
 * keeps track of all entered selling prices, by date and island
 * if no price was entered, default to 0
 */
@TypeORM.Entity({name: "sellingPriceHistory"})
export class SellingPriceHistory extends TypeORM.BaseEntity {
    @TypeORM.PrimaryGeneratedColumn()
    id: number;

    //Each price history entry represents one profile
    @TypeORM.ManyToOne((type) => Profile, (profile:Profile) => profile.sellingPrice, {
        cascade: true,
        onDelete: "CASCADE"
    })
    island: TypeORM.Relation<Profile>;

    @TypeORM.Column()
    date: string;

    @TypeORM.Column({default: 0})
    priceAM: number;

    @TypeORM.Column({default: 0})
    pricePM: number;

    //will be used to grab prices for specific date ranges
    @TypeORM.CreateDateColumn()
    created_at: string;

    @TypeORM.UpdateDateColumn()
    updated_at: string;
}

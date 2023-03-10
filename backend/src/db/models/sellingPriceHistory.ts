/** @module Models/sellingPricesThisWeek */
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, JoinTable,
    ManyToMany,
    OneToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    Relation,
    UpdateDateColumn
} from "typeorm";

import {Profile} from "./profile"


/**
 * class representing SellingPriceHistory table
 * keeps track of all entered selling prices, by date and island
 * if no price was entered, default to 0
 */
@Entity({name: "sellingPriceHistory"})
export class SellingPriceHistory extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    //Each price history entry represents one profile
    @ManyToOne((type) => Profile, (profile:Profile) => profile.sellingPrice, {
        cascade: true,
        onDelete: "CASCADE"
    })
    island: Relation<Profile>;

    @Column({default: 0})
    priceAM: number;

    @Column({default: 0})
    pricePM: number;

    //will be used to grab prices for specific date ranges
    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;
}

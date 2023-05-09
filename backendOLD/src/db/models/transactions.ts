/** @module Models/Profile */
import TypeORM from "typeorm";
import {User} from "./user";
import {Profile} from "./profile";

/**
 * Transactions Model - tracks transactions Users make on different Islands
 */

@TypeORM.Entity()
export class Transactions extends TypeORM.BaseEntity{
    @TypeORM.PrimaryGeneratedColumn()
    id: number;

    @TypeORM.Column()
    numberSold: number;

    @TypeORM.Column()
    priceSold: number;

    @TypeORM.Column()
    profits: number;

    //Each user can complete many transactions
    //Each transaction references one seller (user)
    @TypeORM.ManyToOne((type) => User, (user:User) => user.sale, {
        cascade: true,
        onDelete: "CASCADE"
    })
    seller: TypeORM.Relation<User>

    //Each host island (Profile) can host many transactions
    //Each transaction references one host island(profile)
    @TypeORM.ManyToOne((type) => Profile, (island:Profile) => island.sale, {
        cascade: true,
        onDelete: "CASCADE"
    })
    host: TypeORM.Relation<Profile>




}
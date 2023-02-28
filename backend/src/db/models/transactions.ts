/** @module Models/Profile */
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    Relation
} from "typeorm";
import {User} from "./user";
import {Profile} from "./profile";

/**
 * Transactions Model - tracks transactions Users make on different Islands
 */

@Entity()
export class Transactions extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    numberSold: number;

    @Column()
    priceSold: number;

    @Column()
    profits: number;

    //Each user can complete many transactions
    //Each transaction references one seller (user)
    @ManyToOne((type) => User, (user:User) => user.sale, {
        cascade: true,
        onDelete: "CASCADE"
    })
    seller: Relation<User>

    //Each host island (Profile) can host many transactions
    //Each transaction references one host island(profile)
    @ManyToOne((type) => Profile, (island:Profile) => island.sale, {
        cascade: true,
        onDelete: "CASCADE"
    })
    host: Relation<Profile>




}
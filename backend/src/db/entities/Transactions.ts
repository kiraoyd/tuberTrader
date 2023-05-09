/** @module Models/Transactions */
import {Entity, Property, ManyToOne, Cascade, Unique, OneToMany, Collection} from "@mikro-orm/core";
// Control + click these imports to view their actual code/type
// Also see identity functions here - https://betterprogramming.pub/typescript-generics-90be93d8c292
import type {Ref, Rel} from "@mikro-orm/core";
import { SoftDeletable } from "mikro-orm-soft-delete";
import { TuberBaseEntity } from "./TuberBaseEntity.js";
import { User } from "./User.js";
import {Profile} from "./Profile.js";

@Entity()
export class Transactions extends TuberBaseEntity{
    //id IS already the primary key, thanks to TuberBaseEntity


    @Property()
    numberSold!: number;

    @Property()
    priceSold!: number;

    @Property()
    profits!: number;

    @ManyToOne('User')
    seller!: User;

    @ManyToOne('Profile')
    host!: Profile;
}
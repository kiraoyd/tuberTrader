/** @module Models/SelingPriceHistory */
import {Entity, Property, ManyToOne, Cascade, Unique, OneToMany, Collection} from "@mikro-orm/core";
// Control + click these imports to view their actual code/type
// Also see identity functions here - https://betterprogramming.pub/typescript-generics-90be93d8c292
import type {Ref, Rel} from "@mikro-orm/core";
import { SoftDeletable } from "mikro-orm-soft-delete";
import { TuberBaseEntity } from "./TuberBaseEntity.js";
import { Profile } from "./Profile.js";


@Entity()
export class SellingPriceHistory extends TuberBaseEntity{
    //id IS already the primary key, thanks to TuberBaseEntity


    //Each price history entry represents one profile
    @ManyToOne()
    island!: Ref<Profile>;

    @Property()
    date!: string;

    @Property()
    priceAM!: number;

    @Property()
    pricePM!: number;

    @Property()
    created_at = new Date();

    @Property()
    updated_at = new Date();
}
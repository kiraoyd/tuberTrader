/** @module Models/Profile */
import {Entity, Property, ManyToOne, Cascade, Unique, OneToMany, Collection} from "@mikro-orm/core";
// Control + click these imports to view their actual code/type
// Also see identity functions here - https://betterprogramming.pub/typescript-generics-90be93d8c292
import type {Ref, Rel} from "@mikro-orm/core";
import { SoftDeletable } from "mikro-orm-soft-delete";
import { TuberBaseEntity } from "./TuberBaseEntity.js";
import { User } from "./User.js";
import { Transactions } from "./Transactions.js";
import { SellingPriceHistory } from "./SellingPriceHistory.js";

/**
 * Profile model - This is for interacting with the profile table
 * Each profile corresponds to exactly 1 island owned by a user
 * This allows each user to have many island profiles as they want without needing to create more accounts
 */

@SoftDeletable(() => Profile, "deleted_at", () => new Date())
@Entity()
export class Profile extends TuberBaseEntity {
	//id IS already the primary key, thanks to TuberBaseEntity

	@Property()
	islandName!: string;

	@Property()
	picture!: string;

	@Property()
	turnipsHeld!: number;

	@Property()
	pricePaid!: number;

	//Each user can own many profiles
	//Each profile references one owner(user)
	@ManyToOne('User')
	owner!: Ref<User>;

	//Each island profile can host many sales (Transactions)
	//
	@OneToMany(
		() => Transactions,
		t => t.host,
		{cascade: [Cascade.PERSIST, Cascade.REMOVE]}
	)
	sale!: Collection<Transactions>;

	@OneToMany(
		() => SellingPriceHistory,
		price => price.island,
		{cascade: [Cascade.PERSIST, Cascade.REMOVE]}
	)
	sellingPrice!: Collection<SellingPriceHistory>;

	@Property()
	created_at = new Date();

}
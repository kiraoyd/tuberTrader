/** @module Models/User */
import { Entity, Property, Unique, OneToMany, Collection, Cascade } from "@mikro-orm/core";
import { SoftDeletable } from "mikro-orm-soft-delete";
import { TuberBaseEntity } from "./TuberBaseEntity.js";
import {IPHistory} from "./IpHistory.js";
import { Profile } from "./Profile.js";
import { Transactions } from "./Transactions.js";


/**
 *  Class representing user table
 */
// https://github.com/TheNightmareX/mikro-orm-soft-delete
// Yes, it's really that easy.
@SoftDeletable(() => User, "deleted_at", () => new Date())
@Entity({ tableName: "users"})
export class User extends TuberBaseEntity {

	//id IS already the primary key, thanks to TuberBaseEntity

	@Property()
	name!: string

	@Property()
	email!: string;

	// Note that these DO NOT EXIST in the database itself!
	@OneToMany(
		() => IPHistory,
		ip => ip.user,
		{cascade: [Cascade.PERSIST, Cascade.REMOVE]}
	)
	ips!: Collection<IPHistory>;

	@OneToMany(
		() => Profile,
		p => p.owner,
		{cascade: [Cascade.PERSIST, Cascade.REMOVE]}
	)
	profiles!: Collection<Profile>;

	// Orphan removal used in our Delete All Sent Messages route to single-step remove via Collection
	@OneToMany(
		() => Transactions,
		t => t.seller,
		{cascade: [Cascade.PERSIST, Cascade.REMOVE], orphanRemoval: true}
	)
	sale!: Collection<Transactions>;

	@Property()
	created_at = new Date();

	@Property()
	updated_at = new Date();
}

//Reference from DOGGR:
// @OneToMany(
// 	() => Message,
// 	message => message.receiver,
// 	{cascade: [Cascade.PERSIST, Cascade.REMOVE], orphanRemoval: true}
// )
// messages_received!: Collection<Message>;
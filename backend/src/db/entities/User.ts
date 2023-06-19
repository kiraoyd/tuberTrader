/** @module Models/User */
import { Entity, Property, Unique, OneToMany, Collection, Cascade } from "@mikro-orm/core";
import { SoftDeletable } from "mikro-orm-soft-delete";
import { TuberBaseEntity } from "./TuberBaseEntity.js";
import {IPHistory} from "./IpHistory.js";
import { Profile } from "./Profile.js";
import { Transactions } from "./Transactions.js";
import { Enum } from "@mikro-orm/core";

import {Message} from "./Message.js";


/**
 *  Class representing user table
 */

export enum UserRole {
	ADMIN = 'Admin',
	USER = 'User'
}
// https://github.com/TheNightmareX/mikro-orm-soft-delete

@SoftDeletable(() => User, "deleted_at", () => new Date())
@Entity({ tableName: "users"})
export class User extends TuberBaseEntity {

	//id IS already the primary key, thanks to TuberBaseEntity
	@Property()
	name!: string

	@Unique()
	@Property()
	email!: string;

	@Property()
	password!: string;

	@Enum(() => UserRole)
	role!: UserRole;

	// Note that these DO NOT EXIST in the database itself!
	//TODO - clarify
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

	@OneToMany(
		() => Message,
		message => message.sender,
		{cascade: [Cascade.PERSIST, Cascade.REMOVE], orphanRemoval: true}
	)
	messages_sent!: Collection<Message>;

	@OneToMany(
		() => Message,
		message => message.receiver,
		{cascade: [Cascade.PERSIST, Cascade.REMOVE], orphanRemoval: true}
	)
	messages_received!: Collection<Message>;
}

//Reference from DOGGR:
// @OneToMany(
// 	() => Message,
// 	message => message.receiver,
// 	{cascade: [Cascade.PERSIST, Cascade.REMOVE], orphanRemoval: true}
// )
// messages_received!: Collection<Message>;
/** @module Models/IPHistory */
import { Entity, Property, PrimaryKey, Unique, ManyToOne, Cascade } from "@mikro-orm/core";
import {TuberBaseEntity} from "./tuberBaseEntity.ts";
import { SoftDeletable } from "mikro-orm-soft-delete";
import {User} from "./user";

/**
 * IPHistory model - holds all IPs a user has logged in with
 */
@Entity()
export class IPHistory extends TuberBaseEntity {
	@Property()
	@Unique()
	id: string;

	@Property("text")
	ip: string;

	@ManyToOne(
		(type) => User,
		(user: User) => user.ips,
		//adding an IPHistory will also add associated User if it is new, somewhat useless in this example
		// if we delete a User, also delete their IP History
		{cascade: [Cascade.PERSIST, Cascade.REMOVE]}
	)
	user: User;

	@Property()
	created_at = new Date();
}

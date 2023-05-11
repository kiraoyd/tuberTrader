
/** @module Models/IPHistory */
import { Entity, Property, PrimaryKey, Unique, ManyToOne, Cascade } from "@mikro-orm/core";
import {TuberBaseEntity} from "./TuberBaseEntity.js";
import { SoftDeletable } from "mikro-orm-soft-delete";
import {User} from "./User.js";

/**
 * IPHistory model - holds all IPs a user has logged in with
 */
@Entity()
export class IPHistory extends TuberBaseEntity {


	@Property("text")
	ip: string;

	//every user can have many IP history entries
	@ManyToOne('User')
	user!: User;

	@Property()
	created_at = new Date();
}


// @SoftDeletable(() => Match, "deleted_at", () => new Date())
// @Entity()
// export class Match {
// 	// The person who performed the match/swiped right
// 	@ManyToOne({ primary: true })
// 	owner!: User;
//
// 	// The account whose profile was swiped-right-on
// 	@ManyToOne({ primary: true })
// 	matchee!: User;
//
// 	@Property()
// 	created_at = new Date();
//
// 	@Property({ nullable: true })
// 	deleted_at?: Date;
// }

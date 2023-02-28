/** @module Models/User */
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity, JoinTable,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
	Relation,
	UpdateDateColumn
} from "typeorm";

import {IPHistory} from "./ip_history";
import {Profile} from "./profile";


/**
 *  Class representing user table
 */
@Entity({name: "users"})
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		length: 100,
		type: "varchar"
	})
	name: string;

	@Column('text')
	email: string;


	// Each user have have many IPHistory entries
	@OneToMany((type) => IPHistory, (ip: IPHistory) => ip.user)
	ips: Relation<IPHistory[]>;

	// Each user can have many island profiles
	@OneToMany((type) => Profile, (p: Profile) => p.user)
	profiles: Relation<Profile[]>;


	@CreateDateColumn()
	created_at: string;

	@UpdateDateColumn()
	updated_at: string;
}

/** @module Models/User */

import {IPHistory} from "./ip_history";
import {Profile} from "./profile";
import {Transactions} from "./transactions"
import TypeORM from "typeorm";



/**
 *  Class representing user table
 */
@TypeORM.Entity({name: "users"})
export class User extends TypeORM.BaseEntity {
	@TypeORM.PrimaryGeneratedColumn()
	id: number;

	@TypeORM.Column({
		length: 100,
		type: "varchar"
	})
	name: string;

	@TypeORM.Column('text')
	email: string;


	// Each user have have many IPHistory entries
	@TypeORM.OneToMany((type) => IPHistory, (ip: IPHistory) => ip.user)
	ips: TypeORM.Relation<IPHistory[]>;

	// Each user can own many island profiles
	@TypeORM.OneToMany((type) => Profile, (p: Profile) => p.owner)
	profiles: TypeORM.Relation<Profile[]>;

	//Each user (seller) can have many sales (Transaction)
	@TypeORM.OneToMany((type) => Transactions, (t: Transactions) => t.seller)
	sale: TypeORM.Relation<Transactions[]>


	@TypeORM.CreateDateColumn()
	created_at: string;

	@TypeORM.UpdateDateColumn()
	updated_at: string;
}

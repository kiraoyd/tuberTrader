/** @module Models/Profile */
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity, JoinTable,
	ManyToMany,
	OneToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
	Relation
} from "typeorm";
import {User} from "./user";
import {Transactions} from "./transactions";


/**
 * Profile model - This is for interacting with the profile table
 * Each profile corresponds to exactly 1 island owned by a user
 * This allows each user to have many island profiles as they want without needing to create more accounts
 */
@Entity()
export class Profile extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	islandName: string;

	@Column()
	picture: string;

	@Column()
	turnipsHeld: number;

	@Column()
	pricePaid: number;

	//Each user can own many profiles
	//Each profile references one owner(user)
	@ManyToOne((type) => User, (user: User) => user.profiles, {
		cascade: true,
		// if we delete a User, also delete their profiles
		onDelete: "CASCADE"
	})
	owner: Relation<User>;  //keys back to the owner user

	//Each island profile can host many sales (Transactions)
	@OneToMany((type) => Transactions, (t: Transactions) => t.host)
	sale: Relation<Transactions[]>



	@CreateDateColumn()
	created_at: string;
}



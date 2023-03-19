/** @module Models/Profile */
import TypeORM from "typeorm";
import {User} from "./user";
import {Transactions} from "./transactions";
import {SellingPriceHistory} from "./sellingPriceHistory"


/**
 * Profile model - This is for interacting with the profile table
 * Each profile corresponds to exactly 1 island owned by a user
 * This allows each user to have many island profiles as they want without needing to create more accounts
 */
@TypeORM.Entity()
export class Profile extends TypeORM.BaseEntity {
	@TypeORM.PrimaryGeneratedColumn()
	id: number;

	@TypeORM.Column()
	islandName: string;

	@TypeORM.Column()
	picture: string;

	@TypeORM.Column()
	turnipsHeld: number;

	@TypeORM.Column()
	pricePaid: number;

	//Each user can own many profiles
	//Each profile references one owner(user)
	@TypeORM.ManyToOne((type) => User, (user: User) => user.profiles, {
		cascade: true,
		// if we delete a User, also delete their profiles
		onDelete: "CASCADE"
	})
	owner: TypeORM.Relation<User>;  //keys back to the owner user

	//Each island profile can host many sales (Transactions)
	@TypeORM.OneToMany((type) => Transactions, (t: Transactions) => t.host)
	sale: TypeORM.Relation<Transactions[]>

	//Each island can have many different selling prices
	@TypeORM.OneToMany((type) => SellingPriceHistory, (price: SellingPriceHistory) => price.island)
	sellingPrice: TypeORM.Relation<SellingPriceHistory>



	@TypeORM.CreateDateColumn()
	created_at: string;
}



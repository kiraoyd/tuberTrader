/** @module Seeds/Profile */

import {faker} from "@faker-js/faker";
import {Seeder} from "../../lib/seed_manager";
import {Profile} from "../models/profile";
import {User} from "../models/user";
import {FastifyInstance} from "fastify";
import {Transactions} from "../models/transactions";

// note here that using faker makes testing a bit...hard
// We can set a particular seed for faker, then use it later in our testing!
faker.seed(100);

/**
 * Seeds the ip_history table
 */
export class ProfileSeeder extends Seeder {

	/**
	 * Runs the Profile table's seed
	 * @function
	 * @param {FastifyInstance} app
	 * @returns {Promise<void>}
	 */
	override async run(app: FastifyInstance) {
		app.log.info("Seeding islands...");
		// Remove everything in there currently
		await app.db.profile.delete({});
		// get our users and make each a few IPs
		const users = await User.find();

		for (let i = 0; i < users.length; i++) {
			let newProfile = new Profile();
			newProfile.islandName = "myIsland";
			// Todo: Get rid of placeholder hard coded image link
			newProfile.picture = "http://placeholder.com/mypic.jpeg";
			newProfile.turnipsHeld = i + 1000;
			newProfile.pricePaid = i + 93;
			newProfile.owner = users[i]; //manyToOne

			await newProfile.save();
			app.log.info("Finished seeding profile: " + i);
		}
	}
}

export const ProfileSeed = new ProfileSeeder();

 

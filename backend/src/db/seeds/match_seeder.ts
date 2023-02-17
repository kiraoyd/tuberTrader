/** @module Seeds/Match */

import {faker} from "@faker-js/faker";
import {Seeder} from "../../lib/seed_manager";
import {Match} from "../models/match";
import {User} from "../models/user";
import {FastifyInstance} from "fastify";
import {Profile} from "../models/profile";

// note here that using faker makes testing a bit...hard
// We can set a particular seed for faker, then use it later in our testing!
faker.seed(100);

/**
 * Seeds the ip_history table
 */
export class MatchSeeder extends Seeder {

	/**
	 * Runs the Match table's seed
	 * @function
	 * @param {FastifyInstance} app
	 * @returns {Promise<void>}
	 */
	override async run(app: FastifyInstance) {
		app.log.info("Seeding IP Histories...");
		// Remove everything in there currently
		await app.db.match.delete({});
		// get our users and make each a few IPs
		const profiles = await Profile.find();

		for (let i = 0; i < profiles.length; i++) {
			let newMatch = new Match();
			newMatch.matching_profile = profiles[i];
			newMatch.matched_profile = profiles[i+1] ? profiles[i+1] : profiles[0];

			await newMatch.save();
			app.log.info("Finished seeding match: " + i);
		}
	}
}

export const MatchSeed = new MatchSeeder();

 

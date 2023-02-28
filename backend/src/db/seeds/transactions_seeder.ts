/** @module Seeds/Transactions */

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
export class TransactionsSeeder extends Seeder {

    /**
     * Runs the Transactions table's seed
     * @function
     * @param {FastifyInstance} app
     * @returns {Promise<void>}
     */
    override async run(app: FastifyInstance) {
        app.log.info("Seeding Transactions...");
        // Remove everything in there currently
        await app.db.transactions.delete({});
        // get our users and make each a few Transactions
        const users = await User.find();

        //get our Profiles and make each a few Transactions
        const islands = await Profile.find();

        for (let i = 0; i < users.length; i++) {
            let newTransaction = new Transactions();
            newTransaction.numberSold = i;
            newTransaction.priceSold = i+90;
            newTransaction.profits = i + 1000;
            newTransaction.seller = users[i]; //manyToOne
            newTransaction.host = islands[i]; //manyToOne

            await newTransaction.save();
            app.log.info("Finished seeding transaction: " + i);
        }
    }
}

export const TransactionsSeed = new TransactionsSeeder();



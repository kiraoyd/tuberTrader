/** @module Seeds/SellingPriceHistory */

import {faker} from "@faker-js/faker";
import {Seeder} from "../../lib/seed_manager";
import {Profile} from "../models/profile";
import {SellingPriceHistory} from "../models/sellingPriceHistory";
import {FastifyInstance} from "fastify";


faker.seed(100);

/**
 * seeds the SellingPriceHistory table
 */
export class SellingPriceSeeder extends Seeder {
    override async run(app: FastifyInstance) {
        app.log.info("Seeding Selling Price History...");
        await app.db.transactions.delete({});
        //get our island profiles
        const islands = await Profile.find();

        for (let i = 0; i < islands.length; i++) {
            let newPrice = new SellingPriceHistory();
            newPrice.island = islands[i];
            newPrice.date = `2023-03-${i}`
            newPrice.priceAM = i + 80
            newPrice.pricePM = i + 100
            //no need to seed date created on, thats automatic

            await newPrice.save();
            app.log.info("Finished seeding selling price: " + i);
        }
    }
}

export const SellingPriceSeed = new SellingPriceSeeder();
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

        // get current date and time
        const current = new Date()
        let year = current.getFullYear()
        let month = (current.getMonth() + 1).toString() //January = month 0
        let day = (current.getDate()).toString() //0 -364 days

        //convert date to: yyyy-mm-dd format
        if(day.length === 1){
            day = '0' + day;
        }
        if(month.length === 1){
            month = '0' + month;
        }
        let today = `${year}-${month}-${day}`

        console.log("Today is: ", today, current)
        for (let i = 0; i < islands.length; i++) {
            let newPrice = new SellingPriceHistory();
            newPrice.island = islands[i];
            //newPrice.date = `2023-03-${i}`
            newPrice.date = today
            newPrice.priceAM = i + 80
            newPrice.pricePM = i + 100
            //no need to seed date created on, thats automatic
            await newPrice.save();
            app.log.info("Finished seeding selling price: " + i);
        }

        //seed top 10 values
        for (let i = 0; i < islands.length; i++) {
            let newPrice = new SellingPriceHistory();
            newPrice.island = islands[i];
            //newPrice.date = `2023-03-${i}`
            newPrice.date = today
            newPrice.priceAM = i + 600
            newPrice.pricePM = i + 500
            //no need to seed date created on, thats automatic
            await newPrice.save();
            app.log.info("Finished seeding high selling price: " + i);
        }


    }
}

export const SellingPriceSeed = new SellingPriceSeeder();
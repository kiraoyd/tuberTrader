import type { Dictionary, EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import {SellingPriceHistory} from "../entities/SellingPriceHistory.js";


export class SellingPriceSeeder extends Seeder {
    async run(em: EntityManager, context: Dictionary): Promise<void> {
        // https://mikro-orm.io/docs/seeding#shared-context

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

        context.sp1 = em.create(SellingPriceHistory, {
            island: context.orjeene,
            date: today,
            priceAM: 1100,
            pricePM: 93,
        });

        context.sp2 = em.create(SellingPriceHistory, {
            island: context.popcorn,
            date: today,
            priceAM: 56,
            pricePM: 200,
        });

        context.sp3 = em.create(SellingPriceHistory, {
            island: context.squirtle,
            date: today,
            priceAM: 140,
            pricePM: 568,
        });
        context.sp4 = em.create(SellingPriceHistory, {
            island: context.squirtle,
            date: today,
            priceAM: 100,
            pricePM: 300,
        });
        context.sp5 = em.create(SellingPriceHistory, {
            island: context.squirtle,
            date: today,
            priceAM: 44,
            pricePM: 58,
        });
        context.sp6 = em.create(SellingPriceHistory, {
            island: context.squirtle,
            date: today,
            priceAM: 140,
            pricePM: 568,
        });
        context.sp7 = em.create(SellingPriceHistory, {
            island: context.squirtle,
            date: today,
            priceAM: 550,
            pricePM: 570,
        });
        context.sp8 = em.create(SellingPriceHistory, {
            island: context.squirtle,
            date: today,
            priceAM: 400,
            pricePM: 26,
        });
        context.sp9 = em.create(SellingPriceHistory, {
            island: context.melon,
            date: today,
            priceAM: 10,
            pricePM: 18,
        });
        context.sp10 = em.create(SellingPriceHistory, {
            island: context.squirtle,
            date: today,
            priceAM: 88,
            pricePM: 233,
        });
        context.sp11 = em.create(SellingPriceHistory, {
            island: context.squirtle,
            date: today,
            priceAM: 99,
            pricePM: 102,
        });
    }
}

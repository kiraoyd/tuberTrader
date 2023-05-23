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
    }
}

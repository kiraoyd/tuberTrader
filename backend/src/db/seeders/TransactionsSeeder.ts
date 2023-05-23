import type { Dictionary, EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import {Transactions} from "../entities/Transactions.js";
import {User} from "../entities/User.js";

export class TransactionsSeeder extends Seeder {
    async run(em: EntityManager, context: Dictionary): Promise<void> {
        // https://mikro-orm.io/docs/seeding#shared-context

        context.transaction1 = em.create(Transactions, {
            numberSold: 2000,
            priceSold: 110,
            profits: 50000,
            seller: context.kirak, //grab one of the users we made in that other seeder
            host: context.orjeene,
        });
    }
}
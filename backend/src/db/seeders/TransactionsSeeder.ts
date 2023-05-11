import type { Dictionary, EntityManager } from "@mikro-orm/core";
import {faker} from "@faker-js/faker";
import { Seeder } from "@mikro-orm/seeder";
import { User, UserRole } from "../entities/User.js";
import {Transactions} from "../entities/Transactions

export class TransactionsSeeder extends Seeder {
    async run(em: EntityManager, context: Dictionary): Promise<void> {
        // https://mikro-orm.io/docs/seeding#shared-context

        context.IP1 = em.create(, {
            ip: faker.internet.ip(),
            user: context.kirak, //grab one of the users we made in that other seeder
        });
    }
}

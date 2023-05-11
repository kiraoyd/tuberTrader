import type { Dictionary, EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import {IPHistory} from "../entities/IpHistory.js";
import {faker} from "@faker-js/faker";


export class IpSeeder extends Seeder {
    async run(em: EntityManager, context: Dictionary): Promise<void> {
        // https://mikro-orm.io/docs/seeding#shared-context

        const fakeIP = faker.internet.ip();
        context.IP1 = em.create(IPHistory, {
            ip: fakeIP,
            user: context.kirak, //grab one of the users we made in that other seeder
        });
    }
}


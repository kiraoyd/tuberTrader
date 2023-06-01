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
        const fakeIP2 = faker.internet.ip();
        context.IP2 = em.create(IPHistory, {
            ip: fakeIP2,
            user: context.kirak, //grab one of the users we made in that other seeder
        });
        const fakeIP3 = faker.internet.ip();
        context.IP3 = em.create(IPHistory, {
            ip: fakeIP3,
            user: context.kirak, //grab one of the users we made in that other seeder
        });
        const fakeIP5 = faker.internet.ip();
        context.IP5 = em.create(IPHistory, {
            ip: fakeIP5,
            user: context.kirak, //grab one of the users we made in that other seeder
        });
        const fakeIP4 = faker.internet.ip();
        context.IP4 = em.create(IPHistory, {
            ip: fakeIP4,
            user: context.kirak, //grab one of the users we made in that other seeder
        });
        const fakeIP6 = faker.internet.ip();
        context.IP6 = em.create(IPHistory, {
            ip: fakeIP6,
            user: context.kirak, //grab one of the users we made in that other seeder
        });
        const fakeIP7 = faker.internet.ip();
        context.IP7 = em.create(IPHistory, {
            ip: fakeIP7,
            user: context.kirak, //grab one of the users we made in that other seeder
        });
        const fakeIP8 = faker.internet.ip();
        context.IP8 = em.create(IPHistory, {
            ip: fakeIP8,
            user: context.kirak, //grab one of the users we made in that other seeder
        });
        const fakeIP9 = faker.internet.ip();
        context.IP9 = em.create(IPHistory, {
            ip: fakeIP9,
            user: context.kirak, //grab one of the users we made in that other seeder
        });
        const fakeIP10 = faker.internet.ip();
        context.IP10 = em.create(IPHistory, {
            ip: fakeIP10,
            user: context.kirak, //grab one of the users we made in that other seeder
        });
    }
}


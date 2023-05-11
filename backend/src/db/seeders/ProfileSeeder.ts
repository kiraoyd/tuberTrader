import type { Dictionary, EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { User, UserRole } from "../entities/User.js";
import {Profile} from "../entities/Profile";


export class ProfileSeeder extends Seeder {
    async run(em: EntityManager, context: Dictionary): Promise<void> {
        // https://mikro-orm.io/docs/seeding#shared-context

        //TODO use this line if we want to make a non context seed:
        //const profiles = em.getRepository(Profile);
        //profiles.create({...})

        context.orjeene = em.create(Profile, {
            islandName: "orjeene",
            picture: "http://placeholder.com/mypic.jpeg",
            turnipsHeld: 1100,
            pricePaid: 93,
            owner: context.kirak, //grab one of the users we made in that other seeder
        });
    }
}

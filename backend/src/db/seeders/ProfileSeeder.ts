import type { Dictionary, EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { User, UserRole } from "../entities/User.js";
import {Profile} from "../entities/Profile.js";


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
        context.popcorn = em.create(Profile, {
            islandName: "popcorn",
            picture: "http://placeholder.com/mypic.jpeg",
            turnipsHeld: 100,
            pricePaid: 100,
            owner: context.kirak, //grab one of the users we made in that other seeder
        });
        context.squirtle = em.create(Profile, {
            islandName: "squirtle",
            picture: "http://placeholder.com/mypic.jpeg",
            turnipsHeld: 2000,
            pricePaid: 110,
            owner: context.kirak, //grab one of the users we made in that other seeder
        });
        context.pear = em.create(Profile, {
            islandName: "pear",
            picture: "http://placeholder.com/mypic.jpeg",
            turnipsHeld: 4050,
            pricePaid: 106,
            owner: context.kirak, //grab one of the users we made in that other seeder
        });
        context.fakeorjeene = em.create(Profile, {
            islandName: "fakeorjeene",
            picture: "http://placeholder.com/mypic.jpeg",
            turnipsHeld: 1100,
            pricePaid: 93,
            owner: context.kirak, //grab one of the users we made in that other seeder
        });
    }
}

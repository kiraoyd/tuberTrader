import type {Dictionary, EntityManager} from "@mikro-orm/core";
import {Seeder} from '@mikro-orm/seeder';
import {Message} from "../entities/Message.js";
import {User} from "../entities/User.js";

export class MessageSeeder extends Seeder {
    async run(em: EntityManager, context: Dictionary): Promise<void> {

        const msgRepo = em.getRepository(Message);

        msgRepo.create({
            sender: context.bender,
            receiver: context. kirak,
            message: "Bite my shiny metal...",
        });
        msgRepo.create({
            sender: context.bender,
            receiver: context.otherGuy,
            message: "Kill all humans!",
        });
        msgRepo.create({
            sender: context.bender,
            receiver: context. kirak,
            message: "I'm back baby!",
        });
    }
}
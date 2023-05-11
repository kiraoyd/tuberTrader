import type { Dictionary, EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { User, UserRole } from "../entities/User.js";


export class UserSeeder extends Seeder {
	async run(em: EntityManager, context: Dictionary): Promise<void> {
		// https://mikro-orm.io/docs/seeding#shared-context
		//by making each of these context.someUser, we can reference them in other seeders
		context.kirak = em.create(User, {
			name: "kirak",
			email: "email@email.com",
			password: "password",
			role: UserRole.ADMIN,
		});

		context.otherGuy = em.create(User, {
			name: "otherGuy",
			email: "email2@email.com",
			password: "password",
			role: UserRole.USER,
		});

		context.olimo = em.create(User, {
			name: "olimo",
			email: "email3@email.com",
			password: "password",
			role: UserRole.USER,
		});

		context.bender = em.create(User, {
			name: "bender",
			email: "email4@email.com",
			password: "password",
			role: UserRole.USER,
		});
	}
}

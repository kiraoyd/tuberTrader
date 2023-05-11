import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { ProfileSeeder } from "./ProfileSeeder.js";
import {UserSeeder} from "./UserSeeder.js";
import {SellingPriceSeeder} from "./SellingPriceSeeder";
import {TransactionsSeeder} from "./TransactionsSeeder";
import {IpSeeder} from "./IpSeeder"

export class DatabaseSeeder extends Seeder {
	async run(em: EntityManager): Promise<void> {
		return this.call(em, [
			UserSeeder,
			ProfileSeeder,
			IpSeeder,
			SellingPriceSeeder,
			TransactionsSeeder
		]);
	}
}

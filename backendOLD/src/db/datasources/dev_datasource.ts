// We need dotenv here because our datasources are processed from CLI in addition to vite
import dotenv from "dotenv";
import TypeORM from 'typeorm';
// Similar reasoning as above, we need to add the file extensions to this file's imports for CLI usage
import { User } from "../models/user";
import { IPHistory } from "../models/ip_history";
import { Initialize1676281754950 } from "../migrations/1676281754950-Initialize";
import { Profile } from "../models/profile.js";
import { ProfilesMigration1676586883555 } from "../migrations/1676586883555-ProfilesMigration.js";
import { updatedToTuber1677359851487 } from "../migrations/1677359851487-updatedToTuber.js";
import { Transactions } from "../models/transactions.js";
import { AddedTransactions1677614312887 } from "../migrations/1677614312887-AddedTransactions.js";
import { SellingPriceHistory } from "../models/sellingPriceHistory.js";
import { sellingPriceHistory1678485063600 } from "../migrations/1678485063600-sellingPriceHistory.js";
import { changedSellingPriceTableName1678485876107 } from "../migrations/1678485876107-changedSellingPriceTableName.js";
import { AddedDateColumnToPrices1678493167184 } from "../migrations/1678493167184-AddedDateColumnToPrices.js";

dotenv.config();

// @ts-ignore
const env = process.env;

export const AppDataSource = new TypeORM.DataSource({
    type: "postgres",
    host: env.VITE_DB_HOST,
    port: Number(env.VITE_DB_PORT),
    username: env.VITE_DB_USER,
    password: env.VITE_DB_PASS,
    database: env.VITE_DB_NAME,
    // entities are used to tell TypeORM which tables to create in the database
    entities: [
        User,
        IPHistory,
        Profile,
        Transactions,
        SellingPriceHistory
    ],
    migrations: [
        Initialize1676281754950,
        ProfilesMigration1676586883555,
        updatedToTuber1677359851487,
        AddedTransactions1677614312887,
        sellingPriceHistory1678485063600,
        changedSellingPriceTableName1678485876107,
        AddedDateColumnToPrices1678493167184
    ],
    // DANGER DANGER our convenience will nuke production data!
    synchronize: false
});

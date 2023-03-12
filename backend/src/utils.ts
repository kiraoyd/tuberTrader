/** @module Routes */
import cors from "cors";
import {FastifyInstance, FastifyReply, FastifyRequest, RouteShorthandOptions} from "fastify";
import {User} from "./db/models/user";
import {IPHistory} from "./db/models/ip_history";
import {Profile} from "./db/models/profile";
import {Transactions} from "./db/models/transactions";
import * as types from "./types"
import * as opts from "./opts"
import {ILike, LessThan, Not, Equal, IsNull, ArrayContains, Like} from "typeorm";
import {readFileSync} from "node:fs";
import {SellingPriceHistory} from "./db/models/sellingPriceHistory";
import {amPM} from "./types";


export function updateSellingPrice (record: any, timeOfDayLower: string, price:number):any{
    if (timeOfDayLower === "am") {
        record[0].priceAM = price;
        await app.db.sellingPriceHistory.save(record)
    }
    //if entering PM price,
    else if (timeOfDayLower === "pm") {
       record[0].pricePM = price;
        await app.db.sellingPriceHistory.save(record)
    }
    await reply.send(JSON.stringify({sellingPrice}))//send with the reply
}
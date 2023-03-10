/** @module Types */
import cors from "cors";
import {FastifyInstance, FastifyReply, FastifyRequest, RouteShorthandOptions} from "fastify";
import {User} from "./db/models/user";
import {IPHistory} from "./db/models/ip_history";
import {Profile} from "./db/models/profile";
import {Transactions} from "./db/models/transactions";
import {SellingPriceHistory} from "./db/models/sellingPriceHistory";

/**
 * Interfacing for post/users body
 */
export interface IPostUsersBody {
    name: string,
    email: string,
}

/**
 * Response type for post/users
 */
export type IPostUsersResponse = {
    /**
     * User created by request
     */
    user: User,
    /**
     * IP Address user used to create account
     */
    ip_address: string
}

/**
 * Params type for get/user/:username
 */
export type IGetUserParams ={
    username: string;

}


/**
 * Interfacing for post/profiles
 */

export interface IPostProfilesBody {
    islandName: string,
    picture: string,
    turnipsHeld: number,
    pricePaid: number,
    ownerId: number
}

/**
 * Response type for post/profiles
 */
export type IPostProfilesResponse = {
    profile: Profile
}


/**
 * Params type for get/profile/:islandName
 */
export type IGetProfileParams = {
    islandName: string;
}

/**
 * interface for post/transactions
 */
export interface IPostTransactionsBody {
    numberSold: number,
    priceSold: number,
    profits: number,
    seller: User,
    host: Profile
}

export type IPostTransactionsResponse = {
    transaction: Transactions
}

/**
 * querystring type for get/transaction
 */
export type IQuerystring = {
    sellerID: number;
    islandID: number;
}

export enum amPM {
    am = "am",
    pm ="pm",
    AM ="AM",
    PM ="PM"
}

/**
 * Interface for posting a new selling price
 */
export interface IPostPriceBody{
    island: number,
    price: number,
    //timeOfDay: amPM
    timeOfDay: string,
    date: string
}


export type IPostPriceResponse = {
    price: SellingPriceHistory
}
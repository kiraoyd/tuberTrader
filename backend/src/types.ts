/** @module Types */
import cors from "cors";
import {FastifyInstance, FastifyReply, FastifyRequest, RouteShorthandOptions} from "fastify";
import {User} from "./db/models/user";
import {IPHistory} from "./db/models/ip_history";
import {Profile} from "./db/models/profile";
import {Transactions} from "./db/models/transactions";

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

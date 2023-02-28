/** @module Routes */
import cors from "cors";
import {FastifyInstance, FastifyReply, FastifyRequest, RouteShorthandOptions} from "fastify";
import {User} from "./db/models/user";
import {IPHistory} from "./db/models/ip_history";
import {Profile} from "./db/models/profile";
import {Transactions} from "./db/models/transactions";
import * as types from "./types"

// Appease fastify gods for POSTing a new User, make sure typing matches the interface below
export const post_users_opts: RouteShorthandOptions = {
    schema: {
        body: {
            type: 'object',
            properties: {
                name: {type: 'string'},
                email: {type: 'string'}
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    user: {type: 'object'},
                    ip_address: {type: 'string'}
                }
            }
        }
    }
};

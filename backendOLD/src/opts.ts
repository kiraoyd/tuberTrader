/** @module Routes */
import cors from "cors";
import {FastifyInstance, FastifyReply, FastifyRequest, RouteShorthandOptions} from "fastify";
import {User} from "./db/models/user";
import {IPHistory} from "./db/models/ip_history";
import {Profile} from "./db/models/profile";
import {Transactions} from "./db/models/transactions";
import * as types from "./types/user_types"
import {amPM} from "./types/user_types";

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


//Appease fastify gods for POSTing a new island Profile
export const post_profiles_opts: RouteShorthandOptions = {
    schema: {
        body: {
            type: 'object',
            properties: {
                islandName: {type: 'string'},
                picture: {type: 'string'},
                turnipsHeld: {type: 'number'},
                pricePaid: {type: 'number'},
                ownerId: {type: 'number'}
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    profile: {type: 'object'},
                }
            }
        }
    }
};

//Appease fastify gods for POSTing a new Transaction
export const post_transactions_opts: RouteShorthandOptions = {
    schema: {
        body: {
            type: 'object',
            properties: {
                numberSold: {type: 'number'},
                priceSold: {type: 'number'},
                profits: {type: 'number'},
                seller: {type: 'number'},
                host: {type: 'number'}
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    transaction: {type: 'object'},
                }
            }
        }
    }
};

//Appease fastify gods for POSTing a new Price
export const post_price_opts: RouteShorthandOptions = {
    schema: {
        body: {
            type: 'object',
            properties: {
                island: {type: 'number'},
                price: {type: 'number'},
                // timeOfDay: {type: {"enum":["AM", "am", "PM", "pm"]}}
                timeOfDay: {type: 'string'},
                currentDate:{type: 'string'} //TODO this would be nice as an enum here
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    price: {type: 'object'}
                }
            }
        }
    }
};



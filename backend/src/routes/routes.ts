import dotenv from "dotenv";
dotenv.config();

import { FastifyInstance } from "fastify";
import { UserRoutesInit } from "./user_routes.js";
import {ProfileRoutesInit} from "./profile_routes.js";
import {SPHRoutesInit} from "./sph_routes.js";

/** This function creates all backend routes for the site
 *
 * @param {FastifyInstance} app - The base Fastify listen server instance
 * @param {{}} _options - Fastify instance options (Optional)
 * @returns {Promise<void>} - Returns all of the initialized routes
 */
async function TuberRoutes(app: FastifyInstance, _options = {}) {
	if (!app) {
		throw new Error("Fastify instance has no value during routes construction");
	}

	UserRoutesInit(app);
	ProfileRoutesInit(app);
	SPHRoutesInit(app);
	//MatchRoutesInit(app);
	//MessageRoutesInit(app);
}

export default TuberRoutes;

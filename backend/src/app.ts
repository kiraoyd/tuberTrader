import dotenv from "dotenv";
dotenv.config();
import Fastify from "fastify";
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import { FastifyBadWordsPlugin } from "./plugins/badwords.js";
import { FastifySearchHttpMethodPlugin } from "./plugins/http_search.js";
import { FastifyMikroOrmPlugin } from "./plugins/mikro.js";
import TuberRoutes from "./routes/routes.js";
import config from "./db/mikro-orm.config.js";
//TODO the following are only needed if we register the static files plugin and add the getdirname helper
//import staticFiles from "@fastify/static";
//import {getDirName} from "./lib/helpers";
//import path from "path";

const envToLogger = {
	development: {
		transport: {
			target: 'pino-pretty',
			options: {
				translateTime: 'HH:MM:ss Z',
				ignore: 'pid,hostname',
			},
		},
		level: "debug",
	},
	production: {
		level: "error"
	},
	test: {
		transport: {
			target: 'pino-pretty',
			options: {
				translateTime: 'HH:MM:ss Z',
				ignore: 'pid,hostname',
			},
		},
		level: "warn"
	},
};

const app = Fastify({
	logger: envToLogger[process.env.NODE_ENV]
});

//register middlewares
await app.register(cors, {
	origin: (origin, cb) => {
		cb(null, true);
	},
	methods: ['GET','POST','PUT','DELETE','PATCH','SEARCH'],
});

// add static file handling, TODO needed?
/*
await app.register(staticFiles, {
	root: path.join(getDirName(import.meta), "../public"),
	prefix: "/public/",
});

 */

//app.log.info("Connecting to Database...");
await app.register(multipart);
await app.register(FastifyMikroOrmPlugin, config);
await app.register(FastifySearchHttpMethodPlugin, {});
await app.register(FastifyBadWordsPlugin);

//https://www.npmjs.com/package/fastify-auth0-verify
//this replaces the authPlugin we built in class: await app.register(authPlugin)
//we can now use the preValidation hook on the front end to protect routes

await app.register(import('fastify-auth0-verify'), {
	// 	//these right here are where we grab the secret auth0 makes for us
	domain: 'dev-mqy8ug3j6mzegsua.us.auth0.com',
	audience: 'xw775ux7oDyaS3jImVTAOiE4mD4alsCE'
})


app.log.info("Getting routes...");
await app.register(TuberRoutes, {});

export default app;

import Fastify from "fastify";
import cors from '@fastify/cors'
import { FastifyBadWordsPlugin } from "./plugins/badwords.js";
import { FastifySearchHttpMethodPlugin } from "./plugins/http_search.js";
import { FastifyMikroOrmPlugin } from "./plugins/mikro.js";
import TuberRoutes from "./routes/routes.js";
import config from "./db/mikro-orm.config.js";

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

await app.register(cors, {
	origin: false
});

await app.register(FastifyMikroOrmPlugin, config);
await app.register(FastifySearchHttpMethodPlugin, {});
await app.register(FastifyBadWordsPlugin);

//https://www.npmjs.com/package/fastify-auth0-verify
//this replaces the authPlugin we built in class: await app.register(authPlugin)
//we can now use the preValidation hook on the front end to protect routes
await app.register(require('fastify-auth0-verify'), {
	// 	//these right here are where we grab the secret auth0 makes for us
	domain: 'dev-mqy8ug3j6mzegsua.us.auth0.com',
	audience: 'xw775ux7oDyaS3jImVTAOiE4mD4alsCE'
})

await app.register(TuberRoutes, {});

export default app;

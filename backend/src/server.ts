/** @module Server */

// This will let us use our basic middlewares now, then transition to hooks later
import fastifyMiddie from "@fastify/middie";
import staticFiles from "@fastify/static";
import Fastify, {FastifyInstance} from "fastify";
import path from "path";
import {getDirName} from "./lib/helpers";
import logger from "./lib/logger";
import {tuber_routes} from "./routes";
import DbPlugin from "./plugins/database";



/**
 * This is our main "Create App" function.  Note that it does NOT start the server, this only creates it
 * @function
 * @param useLogging Whether to log or not
 * @return  Promise<FastifyInstance>
 */
export async function buildApp(useLogging: boolean) {
	const app = useLogging ?
		Fastify({
			// enables fancy logs and disabling them during tests
			logger,
		})
		: Fastify({logger: false});

	try {

		// register the auth0 plugin HERE


		//add express-like 'app.use' middleware support
		await app.register(fastifyMiddie);
		// add static file handling
		await app.register(staticFiles, {
			root: path.join(getDirName(import.meta), "../public"),
			prefix: "/public/",
		});

		// Adds all of our Router's routes to the app
		app.log.info("Registering routes");
		await app.register(tuber_routes);

		// Connects to postgres
		app.log.info("Connecting to Database...");
		await app.register(DbPlugin);

		//https://www.npmjs.com/package/fastify-auth0-verify
		//this replaces the authPlugin we built in class: await app.register(authPlugin)
		//we can now use the preValidation hook on the front end to protect routes
		await app.register(require('fastify-auth0-verify'), {
			//these right here are where we grab the secret auth0 makes for us
			domain: 'dev-mqy8ug3j6mzegsua.us.auth0.com',
			audience: 'xw775ux7oDyaS3jImVTAOiE4mD4alsCE'
		})

		await app.register(function (instance, _options, done) {
			instance.get('/verify', {
				handler: function (request, reply) {
					reply.send(request.user)
				},
				preValidation: instance.authenticate
			})

			done()
		})


		app.log.info("App built successfully.");
	} catch (err) {
		console.error(err);
		process.exit(1);
	}

	return app;
}

/**
 * This is what actively starts the server listening on a port
 *
 * @param app: FastifyInstance main server instance created in buildApp()
 * @return  Promise<void> When server closes
 */
export async function listen(app: FastifyInstance) {
	try {
		await app.listen({ // Config object is optional and defaults to { host: 'localhost', port: 3000 }
			host: import.meta.env.VITE_IP_ADDR,
			port: Number(import.meta.env.VITE_PORT),
		}, (err: any) => {  // Listen handler doesn't need to do much except report errors!
			if (err) {
				app.log.error(err);
			}
		});
	} catch (err) { // This will catch any errors that further bubble up from listen(), should be unnecessary
		app.log.error(err);
	}
}




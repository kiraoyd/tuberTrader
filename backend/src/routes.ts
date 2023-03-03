/** @module Routes */
import cors from "cors";
import {FastifyInstance, FastifyReply, FastifyRequest, RouteShorthandOptions} from "fastify";
import {User} from "./db/models/user";
import {IPHistory} from "./db/models/ip_history";
import {Profile} from "./db/models/profile";
import {Transactions} from "./db/models/transactions";
import * as types from "./types"
import * as opts from "./opts"
import {ILike, LessThan, Not, Equal, IsNull, ArrayContains} from "typeorm";

/**
 * App plugin where we construct our routes
 * @param {FastifyInstance} app our main Fastify app instance
 */

//TODO tested and running, just need to start writing some relevant routes based off the most recent homework!
export async function tuber_routes(app: FastifyInstance): Promise<void> {

	// Middleware
	// TODO: Refactor this in favor of fastify-cors
	app.use(cors());

	/**
	 * Route replying to /test path for test-testing
	 * @name get/test
	 * @function
	 */
	app.get("/test", async (request: FastifyRequest, reply: FastifyReply) => {
		reply.send("GET Test");
	});


	// -----------CRUD impl for users----------------

	/**
	 * Route allowing creation of a new user.
	 * @name post/users
	 * @function
	 * @param {string} name - user's full name
	 * @param {string} email - user's email address
	 * @returns {IPostUsersResponse} user and IP Address used to create account
	 */
	app.post<{
		Body: types.IPostUsersBody,
		Reply: types.IPostUsersResponse
	}>("/users", opts.post_users_opts, async (req, reply: FastifyReply) => {

		//grab incoming data from the body
		const {name, email} = req.body;

		//set new User params to data
		const user = new User();
		user.name = name;
		user.email = email;

		//create and attach a new IPHistory row along with this user
		const ip = new IPHistory();
		ip.ip = req.ip;
		ip.user = user;
		// transactional, transitively saves user to users table as well IFF both succeed
		await ip.save();

		//manually JSON stringify due to fastify bug with validation
		// https://github.com/fastify/fastify/issues/4017
		await reply.send(JSON.stringify({user, ip_address: ip.ip}));
	});

	/**
	 * Route that retrieves all current users.
	 * @name get/users
	 * @function
	 */
	app.get("/users", async (req, reply) => {
		let users = await app.db.user.find();
		reply.send(users);
	});

	/** Route retrieves a specific user based on username
	 * @name get/user/:username
	 * @function
	 */
	app.get<{
		Params: types.IGetUserParams
	}>("/user/:username", async(req, reply: FastifyReply)=>{
		//roll through users, if username = name, include user in result
		const username = req.params['username'];
		let user = await app.db.user.find({
			select:{
				id: true,
				name: true,
				email: true,
			},
			where: {
					name: Equal(username)
			}
		})
		reply.send(user)
	});

	/**
	 * Route retrieves all users and the island profiles they own
	 * @name get/users_with_profiles
	 *@function
	 */
	app.get("/users_with_profiles", async(req, reply: FastifyReply)=>{
		//roll through users, if user has at least one profile, include user and profiles in result
		let users_with_profiles = await app.db.user.find({
			select:{
				id: true,
				name: true,
			},
			relations: {
				profiles: true
			},
			where: {
				profiles: {
					id: Not(IsNull())
				}
			}
		});
		reply.send(users_with_profiles)
	});

	// -----------CRUD impl for profiles----------------

	/**
	 * Route allowing creation of a new island profile.
	 * @name post/profiles
	 * @function
	 * @param {string} islandName - name of island
	 * @param {string} picture - profile pic for island
	 * @param {number} turnipsHeld - number of turnips held by island
	 * @param {number} pricePaid - price paid for turnips
	 * @param {number} ownerId - user who owns this island profile
	 * @returns {IPostUsersResponse} user and IP Address used to create account
	 */
	//Postman test on: {"islandName": "orjeene", "picture": "orange.com", "turnipsHeld": 500, "pricePaid": 103, "ownderId": 22}
	app.post<{
		Body: types.IPostProfilesBody,
		Reply: types.IPostProfilesResponse
	}>("/profiles", opts.post_profiles_opts, async (req, reply: FastifyReply) => {

		//grab incoming data from the body
		const {islandName, picture, turnipsHeld, pricePaid, ownerId } = req.body;

		//set new profile params to data
		const profile = new Profile();
		profile.islandName = islandName;
		profile.picture = picture;
		profile.turnipsHeld = turnipsHeld;
		profile.pricePaid = pricePaid;

		//find and match ownerId to existing userID
		//TODO add in a try and except here
			const user = await app.db.user.findOneOrFail({
				where: {
					id: ownerId
				}
			});


		//set profile param to found user
		profile.owner = user;

		await profile.save();

		//manually JSON stringify due to fastify bug with validation
		// https://github.com/fastify/fastify/issues/4017
		await reply.send(JSON.stringify({
		profile}));

	});
}


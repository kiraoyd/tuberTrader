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
		//inside here is an object with a body and reply fields
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
	//We are being lazy and typing the req and reply objects as "any" here, just to save making a new type, but we really should
	app.get("/users", async (req:any , reply:any) => {
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
		try {
			let user = await app.db.user.findOneOrFail({
				select: {
					id: true,
					name: true,
					email: true,
				},
				where: {
					name: Equal(username)
				}
			})
			reply.send(user)
		}
		catch(err){
			reply.status(204).send("No content");
		}
	});

	/**
	 * Route retrieves all users and the island profiles they , will not return users with no profiles
	 * @name get/users_with_profiles
	 *@function
	 */
	//We are being lazy and typing the req object as "any" here, just to save making a new type, but we really should
	app.get("/users_with_profiles", async(req: any, reply: FastifyReply)=>{
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

	//TODO implement soft delete for users

	// -----------CRUD implementation for profiles----------------


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
	//Postman body to test on: {"islandName": "orjeene", "picture": "orange.com", "turnipsHeld": 500, "pricePaid": 103, "ownerId": 22}
	app.post<{
		Body: types.IPostProfilesBody,
		Reply: types.IPostProfilesResponse
	}>("/profiles", opts.post_profiles_opts, async (req, reply) => {

		//grab incoming data from the body
		const {islandName, picture, turnipsHeld, pricePaid, ownerId } = req.body;

		//set new profile params to data
		const profile = new Profile();
		profile.islandName = islandName;
		profile.picture = picture;
		profile.turnipsHeld = turnipsHeld;
		profile.pricePaid = pricePaid;

		//find and match ownerId to existing userID, if userID is found
		try {
			const user = await app.db.user.findOneOrFail({
				where: {
					id: ownerId
				}
			});
			//set profile param to found user
			profile.owner = user;
			await profile.save(); //save to profile table
			await reply.send(JSON.stringify({profile}))//send with the reply
		}
		catch(err) {
				reply.status(204).send("No content"); //TODO is this the right error
			}
		});


	/**
	 * Route that retrieves all current island profiles.
	 * @name get/profiles
	 * @function
	 */
	app.get("/profiles", async (request :FastifyRequest, reply: FastifyReply) => {
		let islands = await app.db.profile.find();
		reply.send(islands);
	});


	/** Route retrieves a specific island profile based on islandName, and shows which user owns it
	 * @name get/profile/:islandName
	 * @function
	 */
	app.get<{
		Params: types.IGetProfileParams
	}>("/profile/:islandName", async(req, reply: FastifyReply)=>{
		//roll through profiles, if islandName = islandName, include profile in result
		const island = req.params['islandName'];
		let profile = await app.db.profile.find({
			select:{
				id: true,
				islandName: true,
				picture: true,
				turnipsHeld: true,
				pricePaid: true,
			},
			relations:{
				owner: true
			},
			where: {
				islandName: Equal(island)
			}
		})
		reply.send(profile)
	});


	/** Route retrieves the profile with the most turnips held
	 * @name get/profile_most_turnips
	 * @function
	 */
	app.get("/profile_most_turnips", async(request: FastifyRequest, reply: FastifyReply)=>{
		//get the max turnipsHeld in the database
		//builds: 		SELECT MAX(turnipsHeld) FROM profile;
		//sending the name of the table "profile" to createQueryBuilder is an alias for convinience
		let query = app.db.profile.createQueryBuilder("profile")
			//select performs the query itself and takes two params: the query itself (MAX(profile.turnipsHeld))
			// and the name of the JSON field to store the query result in (max)
			.select("MAX(profile.turnipsHeld)", "max");
		//convert to a raw value because max() is a calculated value and not actually stored in the DB
		const result: any = await query.getRawOne();
		//result.max now holds the max turnipsHeld in database


		//find the profile that has the max turnipsHeld
		let profile = await app.db.profile.find({
			select:{
				id: true,
				islandName: true,
				picture: true,
				turnipsHeld: true,
				pricePaid: true,
			},
			where:{
				turnipsHeld: result.max //result comes from getRawOne(), and max ties to the second param of select
			}
		});
		//reply with that profile
		reply.send(profile)
	});

	// -----------CRUD implementation for transactions----------------
	/**
	 * Route creates a new transaction between a seller and a host island profile
	 */
	app.post<{
		Body: types.IPostTransactionsBody,
		Reply: types.IPostTransactionsResponse
	}>("/transactions", opts.post_transactions_opts, async (req, reply) => {

		//grab incoming data from the body
		const {numberSold, priceSold, profits, seller, host } = req.body;

		//set new profile params to data
		const transaction = new Transactions();
		transaction.numberSold = numberSold;
		transaction.priceSold = priceSold;
		transaction.profits = profits;

		//find and match seller to existing userID, if userID is found
		try {
			//find and match seller to existing userID, if userID is found
			const user = await app.db.user.findOneOrFail({
				where: {
					id: seller
				}
			});
			//set transaction param to found user
			transaction.seller = user;

			//find and match shost to existing profileID, if profileID is found
			const island = await app.db.profile.findOneOrFail({
				where: {
					id: host
				}
			});
			//set transaction param to found profile
			transaction.host = island;

			await transaction.save(); //save to transaction table
			await reply.send(JSON.stringify({transaction}))//send with the reply
		}
		catch(err) {
			reply.status(204).send("No content"); //TODO is this the right error
		}
	});
}

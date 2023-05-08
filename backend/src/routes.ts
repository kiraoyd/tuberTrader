/** @module Routes */
import cors from "cors";
import {FastifyInstance, FastifyReply, FastifyRequest, RouteShorthandOptions} from "fastify";
import {User} from "./db/models/user";
import {IPHistory} from "./db/models/ip_history";
import {Profile} from "./db/models/profile";
import {Transactions} from "./db/models/transactions";
import * as types from "./types"
import * as opts from "./opts"
import TypeORM from "typeorm";
import {readFileSync} from "node:fs";
import {SellingPriceHistory} from "./db/models/sellingPriceHistory";
import {amPM} from "./types";
import {sellingPriceHistory1678485063600} from "./db/migrations/1678485063600-sellingPriceHistory";
import dotenv from "dotenv";

/**
 * App plugin where we construct our routes
 * @param {FastifyInstance} app our main Fastify app instance
 */

dotenv.config();
const env = process.env;
export async function tuber_routes(app: FastifyInstance): Promise<void> {


	// Middleware
	// // TODO: Refactor this in favor of fastify-cors
	// app.use(cors());

	//gets the token from auth0
	// app.get("/verify", async (request:any, reply:any) =>{
	// 	reply.send(request.user)
	// })

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
		reply.send(JSON.stringify({user, ip_address: ip.ip}));
	});

	/**
	 * Route that retrieves all current users.
	 * @name get/users
	 * @function
	 */
	//We are being lazy and typing the req and reply objects as "any" here, just to save making a new type, but we really should
	app.get("/users", async (req: any, reply: any) => {
		let users = await app.db.user.find();
		reply.send(users);
	});

	/** Route retrieves a specific user based on username
	 * @name get/user/:username
	 * @function
	 */
	app.get<{
		Params: types.IGetUserParams
	}>("/user/:username", async (req, reply: FastifyReply) => {
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
					name: TypeORM.Equal(username)
				}
			})
			reply.send(user)
		} catch (err) {
			reply.status(204).send("No content");
		}
	});

	/**
	 * Route retrieves all users and the island profiles they , will not return users with no profiles
	 * @name get/users_with_profiles
	 *@function
	 */
	//We are being lazy and typing the req object as "any" here, just to save making a new type, but we really should
	app.get("/users_with_profiles", async (req: any, reply: FastifyReply) => {
		//roll through users, if user has at least one profile, include user and profiles in result
		let users_with_profiles = await app.db.user.find({
			select: {
				id: true,
				name: true,
			},
			relations: {
				profiles: true
			},
			where: {
				profiles: {
					id: TypeORM.Not(TypeORM.IsNull())
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
		const {islandName, picture, turnipsHeld, pricePaid, ownerId} = req.body;

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
			reply.send(JSON.stringify({profile}))//send with the reply
		} catch (err) {
			reply.status(204).send("No content"); //TODO is this the right error
		}
	});


	/**
	 * Route that retrieves all current island profiles.
	 * @name get/profiles
	 * @function
	 */
	app.get("/profiles", async (request: FastifyRequest, reply: FastifyReply) => {
		let islands = await app.db.profile.find();
		reply.send(islands);
	});


	/** Route retrieves a specific island profile based on islandName, and shows which user owns it
	 * @name get/profile/:islandName
	 * @function
	 */
	app.get<{
		Params: types.IGetProfileParams
	}>("/profile/:islandName", async (req, reply: FastifyReply) => {
		//roll through profiles, if islandName = islandName, include profile in result
		const island = req.params['islandName'];
		let profile = await app.db.profile.find({
			select: {
				id: true,
				islandName: true,
				picture: true,
				turnipsHeld: true,
				pricePaid: true,
			},
			relations: {
				owner: true
			},
			where: {
				islandName: TypeORM.Equal(island)

			}
		})
		reply.send(profile)
	});


	/** Route retrieves the profile with the most turnips held
	 * @name get/profile_most_turnips
	 * @function
	 */
	app.get("/profile_most_turnips", async (request: FastifyRequest, reply: FastifyReply) => {
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
			select: {
				id: true,
				islandName: true,
				picture: true,
				turnipsHeld: true,
				pricePaid: true,
			},
			where: {
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
		const {numberSold, priceSold, profits, seller, host} = req.body;

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
			reply.send(JSON.stringify({transaction}))//send with the reply
		} catch (err) {
			reply.status(204).send("No content"); //TODO is this the right error
		}
	});

	/**
	 * Route that retrieves all transactions.
	 * @name get/transactions
	 * @function
	 */
	//We are being lazy and typing the req and reply objects as "any" here, just to save making a new type, but we really should
	app.get("/transactions", async (req: any, reply: any) => {
		let transactions = await app.db.transactions.find();
		reply.send(transactions);
	});

	/**
	 * Route that gets a transaction between a specific seller and specific island, using the query string
	 * @name get/transaction
	 * @function
	 */
	//TODO we are cheating by using any here, make some query params
	app.get<{
		Querystring: types.IQuerystring
	}>("/transaction", async (req, reply: FastifyReply) => {
		let {sellerID, islandID} = req.query;
		try {
			const host = await app.db.profile.findOneOrFail({
				where: {
					id: islandID
				}
			})

			const seller = await app.db.user.findOneOrFail({
				where: {
					id: sellerID
				}
			})
			//roll through transactions, if islandID = host.id and sellerID = seller.id, grab it
			let transaction = await app.db.transactions.find({
				select: {
					id: true,
					numberSold: true,
					priceSold: true,
					profits: true,
				},
				relations: {
					seller: true,
					host: true
				},
				where: {
					seller: TypeORM.Equal(seller.id),
					host: TypeORM.Equal(host.id)
				}
			})
			console.log(transaction)
			reply.send(transaction)
		} catch (err) {
			reply.status(204).send("No content")
		}

	})


// -----------CRUD implementation for Selling Prices -------------

	/**
	 * Route to post a new selling price to the SellingPriceHistory table
	 * @name post/sellingPrice
	 */
	app.post<{
		Body: types.IPostPriceBody,
		Reply: types.IPostPriceResponse
	}>("/sellingPrice", opts.post_price_opts, async (req, reply) => {

		//grab incoming data from the body
		const {island, price, timeOfDay, currentDate} = req.body;

		const timeOfDayLower = timeOfDay.toLowerCase();

		//get the island profile associated with island
		const myIsland = await app.db.profile.findOneOrFail({
			where:{
				id: island
			}
		})

		//check for if we already have an entry for this island and this date
		const sellingPrice = await app.db.sellingPriceHistory.find({
			where:{
				island: myIsland,
				date: currentDate
			}
		})
		console.log(sellingPrice)
		//if entry is found
		if(sellingPrice.length != 0) {
			console.log("updating existing")
			//update the existing record

			if (timeOfDayLower === "am") {
				sellingPrice[0].priceAM = price;
				await app.db.sellingPriceHistory.save(sellingPrice)
			}
			//if entering PM price,
			else if (timeOfDayLower === "pm") {
				sellingPrice[0].pricePM = price;
				await app.db.sellingPriceHistory.save(sellingPrice)
			}
			reply.send(JSON.stringify({sellingPrice}))//send with the reply
		}
		else {
			console.log("making new entry...")
			//set body data to a new sellingPrice entry
			const newPrice = new SellingPriceHistory();
			//if entering AM price
			if (timeOfDayLower === "am") {
				//set newPrice fields like so
				newPrice.priceAM = price;
			}
			//if entering PM price
			else if (timeOfDayLower === "pm") {
				newPrice.pricePM = price;
			}
			newPrice.date = currentDate;
			//TODO nit: there is a better way to to this section
			//https://stackoverflow.com/questions/69802845/typeorm-how-to-insert-into-table-with-foreign-key-without-fetching-relation-fi
			//It's possible to create the new price record and link to profile all in one query
			//find and match island to existing profileID, if profileID is found
			try {
				const islandProfile = await app.db.profile.findOneOrFail({
					where: {
						id: island
					}
				});
				//set transaction param to found user
				newPrice.island = islandProfile;

				await newPrice.save(); //save to sellingPriceHistory table
				//TODO
				console.log("saved")
				reply.send(JSON.stringify({newPrice}))//send with the reply
			} catch (err) {
				reply.status(204).send("No content");
			}
		}
	});

	/**
	 * Route to retrieve profiles with the top selling prices
	 */
	//TODO retrieves 0 value from a date
	app.get("/topTurnips", async (req: any, reply: any) => {
		// get current date and time
		const current = new Date()
		let year = current.getFullYear()
		let month = (current.getMonth() + 1).toString() //January = month 0
		let day = (current.getDate()).toString() //0 -364 days

		//convert date to: yyyy-mm-dd format
		if(day.length === 1){
			day = '0' + day;
		}
		if(month.length === 1){
			month = '0' + month;
		}
		let today = `${year}-${month}-${day}`

		console.log("Today is: ", today, current)

		//get time of day: am or pm
		let hours = current.getHours();
		let ampm = hours >= 12 ? 'pm' : 'am';  //if hours >= 12, set to pm, else set to am

		//get price and island profile
		if (ampm === 'pm') {
			let todaysTopTen = await app.db.sellingPriceHistory.find({
				select:{
					id:true, //for some reason this has to be set for the relation to work
					pricePM: true
				},
				relations: {
					island: true
				},
				where:{
					date: today
				},

				order: {
					pricePM: "DESC"
				},
				take: 10,
			})
			reply.send(todaysTopTen)
		}
		else {
			let todaysTopTen = await app.db.sellingPriceHistory.find({
				select:{
					id:true, //for some reason this has to be set for the relation to work
					priceAM: true
				},
				relations: {
					island: true
				},
				where:{
					date: today
				},

				order: {
					priceAM: "DESC"
				},
				take: 10,
			})
			reply.send(todaysTopTen)
		}
	})

	/**
	 * route to support microservice graph of a specific islands current weeks price history
	 */
	app.get("/weeksPrices/:island", async (req: any, reply: any) => {
		const name = req.params['island']

		// get current date and time
		const current = new Date()
		let year = current.getFullYear()
		let month = (current.getMonth() + 1).toString() //January = month 0
		let day = (current.getDate()).toString() //0 -364 days

		//convert date to: yyyy-mm-dd format
		if(day.length === 1){
			day = '0' + day;
		}
		if(month.length === 1){
			month = '0' + month;
		}
		let today = `${year}-${month}-${day}`

		//get island ID
		let islandID = await app.db.profile.findOneOrFail({
			select: {
				id: true
			},
			where: {
				islandName: name,
				id: 8 //TODO eventually delete
			}
		})


		console.log(islandID)


		//get all the entries in sellingPriceHistory for :island
		 let islandPrices = await app.db.sellingPriceHistory.find({
			 select: {
				 priceAM: true,
				 pricePM: true,
				 updated_at: true
			 },
			 relations: {
				 island: true
			 },
			 where: {
				 island: {
					 id: islandID["id"]
				 }
			 }
		 })

		//get back JSON format:
		//[{"priceAM": num. "pricePM": num, "updated_at": "2023-03-11T08:07:25.213Z", "island":{...}}
		//TODO filter out just the current weeks worth of these results
		//microservice will hit this endpoint, and get the JSON back to do stuff with
		reply.send(islandPrices)
	})

}

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { SOFT_DELETABLE_FILTER } from "mikro-orm-soft-delete";
import { User, UserRole } from "../db/entities/User.js";
import { IPostUsersBody, IPostUsersResponse, IUpdateUsersBody, IGetUserParams } from "../types.js";
import {IPHistory} from "../db/entities/IpHistory.js";

export function UserRoutesInit(app: FastifyInstance) {
	/**
	 * Route that retrieves all current users, soft deleted or not
	 * @name get/users
	 * @function
	 */
	app.get("/dbTest", async (request: FastifyRequest, _reply: FastifyReply) => {
		return request.em.find(User, {}, { filters: { [SOFT_DELETABLE_FILTER]: false } });
	});

	/**
	 * Route that retrieves all current users that are NOT soft deleted
	 * @name get/users
	 * @function
	 */

	app.get("/users", async (req, reply) => {
		try {
			const users = await req.em.find(User, {}); //replaces app.db.user.find()
			reply.send(users);
		} catch (err) {
			reply.status(500).send(err);
		}
	});

	/**
	 * Route allowing creation of a new user.
	 * @name post/users
	 * @function
	 * @param {string} name - user's full name
	 * @param {string} email - user's email address
	 * @returns {IPostUsersResponse} user and IP Address used to create account
	 */
	app.post<{ Body: IPostUsersBody, Reply:any }>("/users", async (req, reply) => {
		const { name, email, password } = req.body;


		try {
			//set new User params to data
			const newUser = await req.em.create(User, {
				name,
				email,
				password,
				// We'll only create Admins manually!
				role: UserRole.USER
			});

			//TODO not sure I did this right
			//create and attach a new IPHistory row along with this user
			const newIP = await req.em.create(IPHistory, {
				ip: req.ip,
				user: newUser,
			});
			// em.persist() determines weather to use insert or update to save entity state to DB
			//The entity that owns other entities is the only one needed to persist, the owned entities will auto persist
			await req.em.persist(newIP);

			//em.flush() goes through all entities, and flushes everything to DB at once
			await req.em.flush(); //replaces ip.save()
			//send back the newUser that was just added
			return reply.send(newUser);
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
	});


	app.search("/users", async (req, reply) => {
		const { id } = req.body;

		try {
			const theUser = await req.em.findOneOrFail(User, id, {strict: true});
			reply.send(theUser);
		} catch (err) {
			reply.status(500).send(err);
		}
	});

	/** Route retrieves a specific user based on username
	 * @name get/user/:username
	 * @function
	 */
	app.get<{
		Params: IGetUserParams
	}>("/user/:username", async (req, reply: FastifyReply) => {
		//roll through users, if username = name, include user in result
		const username = req.params['username'];
		try{
			let user = await req.em.findOneOrFail(User, {name: username});
			reply.send(user);
		} catch (err) {
			reply.status(204).send("No content");
		}
	});

	/** Route rupdates a users name and email based on their ID number
	 * @name put/users
	 * @function
	 */
	app.put<{ Body: IUpdateUsersBody }>("/users", async (req, reply) => {
		const { name, id, email } = req.body;

		const userToChange = await req.em.findOneOrFail(User, id, {strict: true});
		userToChange.name = name;
		userToChange.email = email;

		// Reminder -- this is how we persist our JS object changes to the database itself
		await req.em.flush();
		reply.send(userToChange);
	});

	/** Route deletes a user based on id, requires password from admin only user requesting the delete
	 * @name delete/users
	 * @function
	 */
	app.delete<{ Body: { my_id: number; id_to_delete: number, password: string } }>("/users", async (req, reply) => {
		const { my_id, id_to_delete, password } = req.body;

		try {
			// Authenticate my user's role
			const me = await req.em.findOneOrFail(User, my_id, {strict: true});
			// Check passwords match
			if (me.password !== password) {
				return reply.status(401).send();
			}

			// Make sure the requester is an Admin
			if (me.role === UserRole.USER) {
				return reply.status(401).send({ "message": "You are not an admin!"})
			}

			const theUserToDelete = await req.em.findOneOrFail(User, id_to_delete, {strict: true});

			//Make sure the to-be-deleted user isn't an admin
			if (theUserToDelete.role === UserRole.ADMIN) {
				return reply.status(401).send({ "message": "You do not have enough privileges to delete an Admin!"})
			}

			await req.em.remove(theUserToDelete).flush();
			return reply.send(theUserToDelete);
		} catch (err) {
			return reply.status(500).send(err);
		}
	});


	//TODO
	/**
	 * Route retrieves all users and the island profiles they own, will not return users with no profiles
	 * @name get/users_with_profiles
	 *@function
	 */
}

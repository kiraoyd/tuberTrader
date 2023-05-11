import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { SOFT_DELETABLE_FILTER } from "mikro-orm-soft-delete";
import { User, UserRole } from "../db/entities/User.js";
import { IPostUsersBody, IPostUsersResponse, IUpdateUsersBody } from "../types.js";

import {IPHistory} from "../db/entities/IpHistory";

export function UserRoutesInit(app: FastifyInstance) {
	// Route that returns all users, soft deleted and not
	app.get("/dbTest", async (request: FastifyRequest, _reply: FastifyReply) => {
		return request.em.find(User, {}, { filters: { [SOFT_DELETABLE_FILTER]: false } });
	});

	// Route that returns all users who ARE NOT SOFT DELETED
	app.get("/users", async (req, reply) => {
		try {
			const theUser = await req.em.find(User, {});
			reply.send(theUser);
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
	app.post<{ Body: IPostUsersBody, Reply: IPostUsersResponse }>("/users", async (req, reply) => {
		const { name, email } = req.body;
		const ip = req.ip;

		try {
			//set new User params to data
			const newUser = await req.em.create(User, {
				name,
				email,
				// We'll only create Admins manually!
				role: UserRole.USER
			});

			//TODO not sure I did this right
			//create and attach a new IPHistory row along with this user
			const newIP = await req.em.create(IPHistory, {
				ip,
				newUser,
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

	//READ
	app.search("/users", async (req, reply) => {
		const { id } = req.body;

		try {
			const theUser = await req.em.findOneOrFail(User, id, {strict: true});
			reply.send(theUser);
		} catch (err) {
			reply.status(500).send(err);
		}
	});

	// UPDATE
	app.put<{ Body: IUpdateUsersBody }>("/users", async (req, reply) => {
		const { name, id, petType } = req.body;

		const userToChange = await req.em.findOneOrFail(User, id, {strict: true});
		userToChange.name = name;
		userToChange.petType = petType;

		// Reminder -- this is how we persist our JS object changes to the database itself
		await req.em.flush();
		reply.send(userToChange);
	});

	// DELETE
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
}

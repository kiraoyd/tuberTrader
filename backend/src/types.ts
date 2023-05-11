import {User} from "./db/entities/User.ts";


export type IUpdateUsersBody = {
	name: string,
	id: number,
	petType: string
}

export type ICreateMessage = {
	sender_id: number,
	receiver_id: number,
	message: string,
}

export interface IPostUsersBody {
	name: string,
	email: string,
}

/**
 * Response type for post/users
 */
export type IPostUsersResponse = {
	/**
	 * User created by request
	 */
	user: User,
	/**
	 * IP Address user used to create account
	 */
	ip_address: string
}


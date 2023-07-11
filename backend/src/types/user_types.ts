//TODO move types from OLDbackend over!

import {User} from "../db/entities/User.js";
import {IPHistory} from "../db/entities/IpHistory.js"


export type IUpdateUsersBody = {
	name: string,
	id: number,
	email: string;
}

export type ICreateMessage = {
	sender_id: number,
	receiver_id: number,
	message: string,
}

export interface IPostUsersBody {
	name: string,
	email: string,
	password: string,
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
	ip_address: IPHistory,

}

/**
 * Params type for get/user/:username
 */
export type IGetUserParams ={
	username: string;

}


import {Profile} from "../db/entities/Profile.js";

/**
 * Params type for get/profile/:islandName
 */
export type IGetProfileParams = {
    islandName: string;
}


/**
 * Interfacing for post/profiles
 */
export interface IPostProfilesBody {
    islandName: string,
    picture: string,
    turnipsHeld: number,
    pricePaid: number,
    ownerId: number
}

//Citation: chatGPT
//Posting a new profile can have one of two response types: the profile posted, or an error message
export enum PostProfileResponseType {
    Profile = "profile",
    Error = "error"
}
/**
 * Response type for post/profiles
 */
export type IPostProfilesResponse = {
    type: PostProfileResponseType; //Here we set the type
    data: Profile | string;  //here we set the data, which can either be a Profile or a string
}


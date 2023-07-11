import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {User} from "../db/entities/User.js";
import {IPostUsersResponse} from "../types/user_types.js";
import {Profile} from "../db/entities/Profile.js";
import {
    IGetProfileParams,
    IPostProfilesBody,
    IPostProfilesResponse,
    PostProfileResponseType
} from "../types/profile_types.js";


export function ProfileRoutesInit(app: FastifyInstance) {
    /**
     * Route that retrieves all current profiles that are NOT soft deleted
     * @name get/users
     * @function
     */

    app.get("/profiles", async (req,reply) =>  {
        try {
            const profiles = await req.em.find(Profile, {});
            reply.send(profiles);
        } catch (err) {
            reply.status(500).send(err);
        }
    });

    /** Route retrieves a specific island profile based on islandName, and shows which user owns it
     * @name get/profile/:islandName
     * @function
     */
    app.get<{Params: IGetProfileParams}>("/profile/:islandName", async (req, reply: FastifyReply) => {
        //get the param value
        const island = req.params['islandName'];
        try{
            let profile = await req.em.findOneOrFail(Profile, {islandName: island});
            reply.send(profile);
        } catch (err) {
            reply.status(204).send("No Content");
        }
    })

    /** Route retrieves the profile with the most turnips held, returns an array of JSON strings in case multiple profiles share the top turnips held
     * @name get/profile_most_turnips
     * @function
     */
    app.get("/profile_most_turnips", async (request: FastifyRequest, reply: FastifyReply) => {
        //grab all profiles, have them return back in order of the turnipsHeld column, in descending order

        //the profile we want, will be the first thing in 'profiles'
        try {
            let profiles = await request.em.find(Profile, {}, {orderBy: {turnipsHeld: "DESC"}});
            if (profiles.length > 0) {
                let max_turnips: Profile[] = [];
                let max = profiles[0]; //max value profile
                //TODO adapt this to handle dupicates by running through profiles until the next thing is less than the last, store into an array rather than variable
                for (const island of profiles){
                    //handles if there are multiple profiles with the same max turnips held
                    if(island.turnipsHeld == max.turnipsHeld){
                        max_turnips.push(island);
                    }
                }
                reply.send(JSON.stringify(max_turnips));
            }
        } catch (err) {
            reply.status(204).send("No Content")
        }
    })

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

    app.post<{
        Body: IPostProfilesBody,
        Reply: IPostProfilesResponse
    }>("/profiles", async(req, reply) => {
        //grab incoming data from the body
        const {islandName, picture, turnipsHeld, pricePaid, ownerId} = req.body;

        //set new profile params to data
        const profile = new Profile();
        profile.islandName = islandName;
        profile.picture = picture;
        profile.turnipsHeld = turnipsHeld;
        profile.pricePaid = pricePaid;

        //find and match ownerId to existing userId, is user exists
        try{
            const user = await req.em.findOneOrFail(User, {id: ownerId});
            //post to the database
            const newIsland = await req.em.create(Profile, {islandName, picture, turnipsHeld, pricePaid, owner: user});
            //set the response type info for a Profile
            const response: IPostProfilesResponse = {
                type: PostProfileResponseType.Profile,
                data: newIsland
            };
            await req.em.flush();
            reply.send(response);
        } catch (err) {
            //set the response type info for an Error
            const errorResponse: IPostProfilesResponse = {
                type: PostProfileResponseType.Error,
                data: "Requested owner of this island is not a registered User for this site."
            }
            reply.status(204).send(errorResponse);
        }

    });
}
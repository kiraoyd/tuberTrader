import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {User} from "../db/entities/User.js";
import {IPostUsersResponse} from "../types/user_types.js";
import {Profile} from "../db/entities/Profile.js";
import {SellingPriceHistory} from "../db/entities/SellingPriceHistory.js";
import {
    IGetProfileParams,
    IPostProfilesBody,
    IPostProfilesResponse,
    PostProfileResponseType
} from "../types/profile_types.js";

export function SPHRoutesInit(app: FastifyInstance) {
    /** TODO make types for req and reply!
     * Route to retrieve profiles with the top selling prices
     */
    app.get("/topTurnips", async (req:any, reply:any)=> {
        //get current date and time
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
        if(ampm === 'pm') {
            let records = await req.em.find(SellingPriceHistory, {}, {orderBy: {pricePM: "DESC"}});
            //grab the first ten, store
            let todaysTopTen: SellingPriceHistory[] = [];
            let count = 0;
            for (const record of records){
                if(count < 10) {
                    todaysTopTen.push(record);
                }
                count+=1;
            }
            reply.send(todaysTopTen);
        }
        else {
            let records = await req.em.find(SellingPriceHistory, {}, {orderBy: {priceAM: "DESC"}});
            //grab the first ten, store
            let todaysTopTen: SellingPriceHistory[] = [];
            let count = 0;
            for (const record of records){
                if(count < 10) {
                    todaysTopTen.push(record);
                }
                count+=1;
            }
            reply.send(todaysTopTen);
        }

    })
}
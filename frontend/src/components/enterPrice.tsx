//Component only viewable on login, allows a user to enter a price for an island and have it update the Profile table
//Would be nice for it to only allow them to do it for an island they actually own, but that'll have to be a task
//for another day

import {useEffect, useState} from "react";
//import axios
import axios from "axios";

export function EnterPriceForm(){
    let [enteredPrice, setEnteredPrice] = useState({})
    let [island, setIsland] = useState(0)
    let [price, setPrice] = useState(0)
    let [date, setDate] = useState ("")
    let [time, setTime] = useState ("")


    const current = new Date()
    let hours = current.getHours();
    let ampm = hours >= 12 ? 'pm' : 'am';  //if hours >= 12, set to pm, else set to am

    const handleSubmit = (event) => {
        event.preventDefault()
        let priceData = {"island":0, "price":0, "timeOfDay": "am", "currentDate": "yyyy-dd-mm"}
        //priceData["island"] = {island}  TODO need to convert this to actual island id
        priceData["island"] = 5
        priceData["price"] = 10000
        priceData["currentDate"] = date
        priceData["timeOfDay"] = ampm
        console.log(priceData)
        setEnteredPrice(priceData)
        //TODO error 500 on server side coming back from this post
        //make async function to make request to backend to make the post
        const postNewPrice = async() => {
            const newPrice = await axios.post("http://localhost:8080/sellingPrice", enteredPrice);
            console.log(newPrice)
            setEnteredPrice(newPrice.data);  //useEffect calls this after the axios
        }; postNewPrice();
    }
        return (
            <form onSubmit={handleSubmit}>
               <label>
                   Enter Island Name:
                   <input type="text" value = {island} onChange={(event) => setIsland(event.target.value)}/>
               </label>
                <label>
                    Enter Turnip Selling Price:
                    <input type="number" value = {price} onChange={(event) => setPrice(event.target.value)}/>
                </label>
                <label>
                    Is this the am price or the pm price?
                    <input type="text" value = {time} onChange={(event) => setTime(event.target.value)}/>
                </label>
                <label>
                    Enter the date for this price (yyyy-dd-mm):
                    <input type="text" value = {date} onChange={(event) => setDate(event.target.value)}/>
                </label>
                <button type="submit">Submit</button>
            </form>
        )
}


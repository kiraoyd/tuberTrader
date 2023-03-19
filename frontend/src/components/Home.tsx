//Component for the homepage
import {useEffect, useState} from "react";
//import axios
import axios from "axios";
//two different ways to import, based on how we exported
import {SearchBar} from './Search'
//import initialState, {getRandomProfile} from "../initialState";


export default function Home() {
    return (<div>
            <Title/>
            <Subtitle/>
            <TopTen />
            <SearchBar/>
        </div>
    );
}

//We can use these components anywhere else!
export function Title() {
    return (<h1>Tuber Trader</h1>)
}

export function Subtitle() {
    return (<h3>Watch em grow!</h3>)
}


//component to display the top ten islands
export function TopTen(){
    let [topTen, setTopTen] = useState([])
    let [timer, setTimer] = useState(0)

    useEffect(() => {
            //make async function to make request to backend
            const getTopTen = async() => {
                const topTen = await axios.get("http://localhost:8080/topTurnips");
                console.log(topTen)
                setTopTen(topTen.data);  //useEffect calls this after the axios
            }; getTopTen();

            let time = setTimeout(()=> setTimer(timer + 1)
            , 5000);

    }, [timer]);

    //TODO need to reconcile the logic behind price being stored in either pricePM or
    const current = new Date()
    let hours = current.getHours();
    let ampm = hours >= 12 ? 'pm' : 'am';  //if hours >= 12, set to pm, else set to am
    if(ampm === "am") {
        return (
            <div>
                <h2>Islands with the Hottest Turnip Prices Right Now:</h2>
                {topTen ?
                    <ul> {topTen.map((record: { id: number, priceAM: number, island: {} }) =>
                        <li key={record.id.toString()}>{record.island["islandName"]} Currently selling turnips
                            for: {record.priceAM} bells each</li>
                    )}
                    </ul>
                    : null
                }
            </div>
        )
    }
    else{
        return (
            <div>
                <h2>Islands with the Hottest Turnip Prices Right Now:</h2>
                {topTen ?
                    <ul> {topTen.map((record: { id: number, pricePM: number, island: {} }) =>
                        <li key={record.id.toString()}>{record.island["islandName"]} Currently selling turnips
                            for: {record.pricePM} bells each</li>
                    )}
                    </ul>
                    : null
                }
            </div>
        )
    }
}


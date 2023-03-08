//Component for the homepage
import {useEffect, useState} from "react";
//import axios
import axios from "axios";

//two different ways to import, based on how we exported
import {SearchBar} from './Search'
//import {Profile} from './Profile'
import initialState, {getRandomProfile} from "../initialState";


export default function Home() {
    return (<div>
            <Title/>
            <Subtitle/>
            <Profile />
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

//TODO placeholder, will be replaced with call to backend to fetch top 10
export function Profile(){
    let [profile, setProfile] = useState(initialState.currentProfile);

    //will be replaced with a map over the top 10 profiles array
    return(
        <div>
            <img src={profile.picture}/>
            <h2>{profile.islandName}</h2>
        </div>
    )
}

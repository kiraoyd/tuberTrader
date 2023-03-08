import {useEffect, useState} from 'react';
import initialState, {getRandomProfile} from "../initialState";
import {Profile} from "./Profile";
import {Title} from "./Home";


function searchResult(){
    //set up overall state

    //create state for currentProfile on page
     let [foundProfile, setFoundProfile] = useState(initialState.currentProfile);
}
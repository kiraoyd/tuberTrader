import {useEffect, useState} from 'react';
import initialState, {getRandomProfile} from "../initialState";
import {Profile} from "./Profile";
import {Title} from "./Home";
import axios from "axios";
//https://masteringjs.io/tutorials/axios/get-query-params


function searchResult(){
    //set up overall state

    //create state for foundProfile on page
     let [foundProfile, setFoundProfile] = useState(initialState.currentProfile);

     useEffect(() => {
          //async function to call the backend and get requested island profile
          const getIsland = async() =>{
               //make the axios request
               const island = await axios.get("http//localhost:8080/profile",{params:{islandName:'orjeene'}});
               setFoundProfile(island);
          };
          getIsland();
     }, []); //list state changes we want to affect this useEffect

     //return the html to display this profile
     return(
         <div>
              <img src={foundProfile.picture}/>
              <h2>{foundProfile.islandName}</h2>
              <p>Turnips held: {foundProfile.turnipsHeld}</p>
              <p>Price paid per turnip: {foundProfile.pricePaid}</p>
         </div>
     )
}
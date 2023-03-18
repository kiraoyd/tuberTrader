import {useEffect, useState} from 'react';
import initialState, {getRandomProfile} from "../initialState";
import {State, ProfileType} from "../types/tuberTypes";
import {Profile} from "./Profile";
import {Title} from "./Home";
import axios from "axios";
//https://masteringjs.io/tutorials/axios/get-query-params


export function SearchResult(props){
    //set up overall state

    //use props to get the state from parent "Search"
    //create state for foundProfile on page
     let [foundProfile, setFoundProfile] = useState(initialState.currentProfile);
    //let [foundProfile, setFoundProfile] = useState(ProfileType);

     useEffect(() => {
          //async function to call the backend and get requested island profile
         console.log("in useeffect")
         const getIsland = async() =>{
              let islandRequested = props.name
              //let url = `http://127.0.0.1:8000/search/{islandRequested}/findIsland`
              let url = `http://127.0.0.1:8000/search/myIsland/findIsland`
               //make the axios request
               //const island = await axios.get("http//localhost:8080/profile",{params:{islandName:'orjeene'}});
              //update below hit to microservice url to not just search for "myIsland"
               const island = await axios.get(url);
               setFoundProfile(island);
          };
          getIsland();
     }, [props.island]); //list state changes we want to affect this useEffect

     //return the html to display this profile
     return(
         <div>
             <h2>Search Results</h2>
              {/*<img src={foundProfile.picture}/>*/}
              <h2>{foundProfile.islandName}</h2>
              <p>Turnips held: {foundProfile.turnipsHeld}</p>
              <p>Price paid per turnip: {foundProfile.pricePaid}</p>
         </div>
     )
}
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
     //let [foundProfile, setFoundProfile] = useState(initialState.currentProfile);
     let[islandRequested, setIslandRequested] = useState(props.island)
     let [foundProfile, setFoundProfile] = useState();
     let[islandFound, setIslandFound] = useState();
     let[error, setError] = useState("");

     useEffect(() => {
          //async function to call the backend and get requested island profile
         console.log("in useeffect")

         const getIsland = async() =>{
             setIslandRequested(props.island)
              let url = `http://127.0.0.1:8000/search/${islandRequested}/findIsland`
              //let url = "http://127.0.0.1:8000/search/myIsland/findIsland"
               //make the axios request
              try {
                 //TODO rendering after two hits to search button
                  //update below hit to microservice url to not just search for "myIsland"
                  let record = await axios.get(url);
                  //Turn returning data into JSON to reflect profile type
                  console.log(record)
                  let island = {
                      "id": record.data[0],
                      "picture": record.data[1],
                      "thumbnail": record.data[1],
                      "created_at": record[2],
                      "owner_id": record.data[3],
                      "islandName": record.data[4],
                      "turnipsHeld": record.data[5],
                      "pricePaid": record.data[6]
                  }
                  console.log(island)
                  setFoundProfile(island);
                  setIslandFound(true) //assume we will find the island requested
              }
              catch(error){
                 setError("Not found")
                  console.log(error)
                  setIslandFound(false)
              }
          };
          getIsland();
     }, [props.submitted]); //list state changes we want to affect this useEffect

     //return the html to display this profile

    if(islandFound) {
        return (
            <div>
              <h2>Search Results</h2>
                {/*<img src={foundProfile.picture}/>*/}
                <h2>Island: {foundProfile.islandName}</h2>
                <p>Turnips held: {foundProfile.turnipsHeld}</p>
                <p>Price paid per turnip: {foundProfile.pricePaid}</p>

            </div>
        )
    }
    return(<h3>Sorry that island is not in our system, please search again</h3>)

}
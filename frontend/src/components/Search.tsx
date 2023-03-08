
import {useEffect, useState} from "react";
//https://www.emgoto.com/react-search-bar/
// https://beta.reactjs.org/reference/react-dom/components/input
//import axios
import axios from "axios";
//create search bar component

export const SearchBar = () => {
    //TODO I can save the island name from the search bar, but how to get it to the "search results page"
    let [island, setIslandName] = useState("")

    function getIslandName(e:any){
        e.preventDefault(); //prevent browser from reloading page
        setIslandName(e.target.value) //island = e.target.value
    }

    return(
    <form action = "/" method = "get" onSubmit={getIslandName}>
        <label htmlFor = "header-search">
            <span className="visually-hidden"> Find an Island! </span>
        </label>
        <input
            type="text"
            value={island}
            id="island-search"
            placeholder="Search islands"
            name="s"
            />
        <button type="submit"> Search </button>
    </form>
)};


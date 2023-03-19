
import {useEffect, useState} from "react";
import {SearchResult} from './searchResult';
//https://www.emgoto.com/react-search-bar/
// https://beta.reactjs.org/reference/react-dom/components/input
//import axios
import axios from "axios";
//create search bar component

export function SearchBar(){
    //TODO I can save the island name from the search bar, but how to get it to the "search results page"
    let [island, setIslandName] = useState("")
    let [searchTerm, setSearchTerm] = useState("")
    let [submitted, setSubmitted] = useState(0)

    //update searchTerm value with input from search bar
    function handleChange(event){
        setSearchTerm(event.target.value);
    }

    function getIslandName(event:any){
        event.preventDefault(); //prevent browser from reloading page
        setIslandName(searchTerm) //set island name to searchTerm typed in
        setSubmitted(submitted+1)
        console.log("Island requested on submit: ", searchTerm)
    }
    //only render with Search Results if our search button has been hit at least once
    if(submitted === 0) {
        return (
            <div>
                <form action="/" method="get" onSubmit={getIslandName}>
                    <label htmlFor="header-search">
                        <span className="visually-hidden"> Find an Island! </span>
                    </label>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleChange}
                        id="island-search"
                        placeholder="Search islands"
                        name="s"
                    />
                    <button type="submit"> Search</button>
                </form>
            </div>
        )
    }
    return (
        <div>
            <form action="/" method="get" onSubmit={getIslandName}>
                <label htmlFor="header-search">
                    <span className="visually-hidden"> Find an Island! </span>
                </label>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleChange}
                    id="island-search"
                    placeholder="Search islands"
                    name="s"
                />
                <button type="submit"> Search</button>
            </form>
            <SearchResult island={island} submitted={submitted}/>
        </div>
    )
};


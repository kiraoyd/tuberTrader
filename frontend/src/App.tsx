
import './App.css'
//import all our components
import {Button} from "./components/Button"
import {Users} from "./components/Users"
import {Link, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Match from './components/Match';
import {useEffect, useState} from "react";
import initialState from "./initialState";

//Here is where we create our App, that we mount in main.tsx
/*
//silly simple static app
function App(){
    return(
        <div className = "App">
            <Home />
            <Button />
            <Users />
        </div>
    );
 */

//doggr version
function App() {
    useEffect(() => {
        console.log("-- App rerenders --");
    });

    return (
        <div className="App">
            <nav>
                <div className="menu">
                    <Link to="/">Home</Link>
                    <Link to="/match">Match</Link>
                </div>
            </nav>
            <Routes>
                <Route path="/match" element={<Match/>}/>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </div>
    )
}

export default App

import './App.css'
//import all our components
import {Button} from "./components/Button"
import {Users} from "./components/Users"
import {Link, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Match from './components/Match';
import {useEffect, useState, useContext} from "react";
import initialState from "./initialState";
import {Login} from "./components/Login";
import {AuthProvider, getLoginTokenFromServer} from "./services/AuthService";


//Here is where we create our App, that we mount in main.tsx
function App() {

    //any state we add here could be passed to the other components below,
    //simply by shoving them in


    useEffect(() => {
        console.log("-- App rerenders --");
    });

    //AuthProvider makes everything in AuthProvider available to the entire app
    return (
        <AuthProvider>
        <div className="App">
            <nav>
                <div className="menu">
                    <Link to="/">Home</Link>
                    <Link to="/login"></Link>
                    {/*add other "page" components here*/}
                </div>
            </nav>
            <Routes>
                {/*<Route path="/match" element={<Match/>}/>*/}
                <Route path="/login" element={<Login/>}/>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </div>
        </AuthProvider>);
}

export default App
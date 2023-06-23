import {Link, Route, Routes} from "react-router-dom";
import {ProtectedRoute} from "./ProtectedRoute";
import {LoginAuth0Button, LogoutAuth0Button} from "./Login";
import {TokenButton} from "./tokenTest";

import Home from "./Home";
import {EnterPriceForm} from "./enterPrice"
import { useAuth0 } from "@auth0/auth0-react";
import {useEffect, useState} from 'react';


//The parent component to be plugged into App
export function NavMain(){
    return(<>
        <NavView/>
        <NavRoutes/>
        </>)
}

//The links is the visual: can a person see the link at all
//this is the component we want token access, as we use it to determine what links people can see
//all componets here will have access to the token, as they are children
function NavView(){
    //PublicLinksView is unguarded
    //If token, AuthLinksView is shown (logout option)
    //else, NoAuthLinksView is shown (login option)

    // const {token} = useAuth();

    //TODO trying to use the useAuth0 hook to get the token
    //https://auth0.com/docs/quickstart/spa/react/02-calling-an-api
    //const {getAccessTokenSilently} = useAuth0()
    const {isAuthenticated} = useAuth0()
    let[token, setToken] = useState("")

    return(
        <nav>
            <div className="menu">
                <PublicLinksView/>
                {
                    isAuthenticated ?
                        <AuthLinksView />
                        : <NoAuthLinksView/>
                }
            </div>
        </nav>
    );
}

//Links that are always shown, despite token status
function PublicLinksView() {
    return(<><Link to="/">Home</Link></>)
}

//Links shown if token present (logged in)
function AuthLinksView(){
    return(<>
        {/*<LogoutAuth0Button>Logout</LogoutAuth0Button>*/}
        <LogoutAuth0Button />
        <Link to="/newPrice"> Enter Your Turnip Price</Link>
        <TokenButton />
     </>);
}


//Links shown if no token present (not logged in)
//TODO trying to use the Auth0 login button
//TODO docker compose up fails if we add the login button on line 81 here
function NoAuthLinksView() {
    return(
        <>
            {/*<LoginAuth0Button>Login</LoginAuth0Button>*/}
            <LoginAuth0Button />
        </>
    );
}


//The routes are the logic flow: can a person GET to a page?
// NOTE:Even if there is no link complenting a route, a user can still go to the page by typing the url, unless we protect the route
//no need to have token state here, as we establish this with the ProtectedRoute parent we wrap token-only routes in
function NavRoutes(){
    return(
        <Routes>
            <Route path="/newPrice" element={<ProtectedRoute><EnterPriceForm/></ProtectedRoute>}/>
            <Route path="/" element={<Home/>}/>
        </Routes>
    )
}
import {useCallback, useState, useEffect} from "react";
import React from "react";
import ReactDOM from "react-dom"
import {useAuth, AuthContext} from "../services/AuthService";
import{useNavigate} from "react-router-dom";
import {Auth0Provider} from "@auth0/auth0-react";
import { useAuth0 } from "@auth0/auth0-react";


//TODO added to try and use auth0-react to reroute to auth0's universal login page
export function LoginAuth0Button() {
    const { loginWithRedirect } = useAuth0();

    return <button onClick={() => loginWithRedirect()}>Log In</button>;
}

//TODO added to try and use auth0-react to reroute to auth0's universal login page
export function LogoutAuth0Button(){
    const { logout } = useAuth0();

    return (
        <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Log Out
        </button>
    );
}

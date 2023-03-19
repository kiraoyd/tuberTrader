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

//Based off our Doggr Login component
/*
export function Login() {

    if (!AuthContext) return null;
    //use our custom hook to get access to the Login functionality in Auth
    const {handleLogin} = useAuth();

    //these get set with onChange() in the html below
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitFailed, setSubmitFailed] = useState(false);

    //this gets called in the html when the user submits something
    const onSubmitLogin = (event) => {
        event.preventDefault();  //TODO what is this
        handleLogin(email, password) //call the login functionality provided by Auth
    };
    //send back the component that injects the functionality above into the html
    return (
        <div>
            <div>Login</div>
            <div>
                {submitFailed ? (
                        <div>Your password or email was incorrect!</div>
                    )
                    : null}
            </div>
            <div>
                <label htmlFor="email">Email: </label>

                <input
                    type="text"
                    id="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    name="email"
                />
            </div>

            <div>
                <label htmlFor="password">Password: </label>
                <input
                    type="text"
                    id="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    name="password"
                />
            </div>

            <div>
                <button onClick={onSubmitLogin}>
                    Submit
                </button>
            </div>
        </div>
    );
}

 */

//this doesn't need to render anything, it just needs to log
//All we need to do on logout is remove the token, and navigate the user back to the homepage
//then set a route and link to logout in the App

//TODO added to try and use auth0-react to reroute to auth0's universal login page
export function LogoutAuth0Button(){
    const { logout } = useAuth0();

    return (
        <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Log Out
        </button>
    );
}

//Based off our original Doggr login component
/*
export function Logout() {
    const{handleLogout} = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        handleLogout();
        navigate("/");
    });

    //send back some empty tags as a component, this is JSX's version of null
    return(<></>)
}
*/

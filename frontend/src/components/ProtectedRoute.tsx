import {
    Routes,
    Route,
    NavLink,
    Navigate,
    useNavigate
} from 'react-router-dom';
// import { useAuth } from "../services/AuthService";
import {useCallback, useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";

//TODO come back to this once we have auth0 working
//This will create a component that can wrap routes we want to restrict to token-only access
//Every route we WRAP in this, will be considered the "children" and will be login protected
//We get the token state here, so any children we wrap with this component will have token access
export const ProtectedRoute = ({children}) => {
    const {isAuthenticated} = useAuth0()

    //user has logged into Auth0
    if(!isAuthenticated){
        //user has not logged into Auth0
        return <Navigate to="/" replace/>
    }
    return children //render the protected routes (the children)

}

/*
//TODO trying to use the useAuth0 hook to get the token
//https://auth0.com/docs/quickstart/spa/react/02-calling-an-api
//const {getAccessTokenSilently} = useAuth0()
const { user, isAuthenticated, isLoading, getAccessTokenSilently, getIdTokenClaims } = useAuth0()
let[token, setToken] = useState("")
console.log(token)

useEffect(()=>{
    const getToken = async() =>{
        const claims = await getIdTokenClaims();
        let tokenBack = await claims.__raw;
        // const tokenBack = await getAccessTokenSilently(
        // {
        //     authorizationParams: {
        //         audience: "https://dev-mqy8ug3j6mzegsua.us.auth0.com/api/v2/",
        //         scope: "read:current_user"
        //     }
        // })
        console.log(tokenBack)
        setToken(tokenBack)

    };
    getToken();
    console.log(token)
}, []);

 */
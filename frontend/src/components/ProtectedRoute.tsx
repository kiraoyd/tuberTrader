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

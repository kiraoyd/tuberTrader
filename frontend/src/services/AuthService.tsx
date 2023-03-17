import {httpClient, updateAxios} from "./HttpService";
import {createContext, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContextProps} from "../types/tuberTypes";

//TODO change email to "username" everywhere

//Initially retrieve a token from local storage (where it was placed in a prior login)
const initialToken = getTokenFromStorage();


//A Provider is a component React provides to us, that does some sort of Context utility
//{children} arg is simply a placeholder for ALL child components, and refers to every other component that our AuthProvider wraps
//We want to move all our token stuff into this Provider, because we want EVERY child of this component to access Auth
export const AuthProvider = ({children}) => {
    // useNavigate() is react-router-dom's utility for being able to programmatically send a user to a different page
    const navigate = useNavigate();

    //make state for the JWT token, received from logging in set its default to an attempt to grab a token from Local Storage
    //That way, Auth owns it and can give access to its children components
    //It will be returned in the useAuthContextPackage (below)
    const [token, setToken] = useState<string>(initialToken);

    //All child components will be able to retrieve and call from useAuth()


    // which enables them to log a user in based on email/ given to this function
    //It gets the token from the server, and sets the token State once we have it
    //It will be returned in the useAuthContextPackage (below)
    const handleLogin = async (email, password) => {
        const newToken = await getLoginTokenFromServer(email, password);
        //once we have the token, we need to set it, which will trigger all aspects of App to rerender
        await saveToken(newToken);
        //once user finished logging in, send them back whereever they came to the login page from, -2 would send them back 2 pages
        navigate(-1);
    };

    //this function just resets the token to nothing upon logout
    //any component can call it from useAuth() to log a user out
    const handleLogout = async () => {
        //empty string in JS can be represented as: null/undefined/"", all work
        //Note: the absence of a token is considered a "new token" as well, so we still must update the state here
        await saveToken(null);
        //after logout, send user back to homepage
        navigate("/")
    };



    //After a new token is received, this will perform all necessary state updates
    const saveToken = async (token:string) => {
        //update the Auth's owned state for token
        setToken(token);

        //Save token to local storage for later retrieval when user returns to site
        localStorage.setItem("token", JSON.stringify(token))

        //update Axios with new token to aid in continued auto auth requests on the backend
        await updateAxios(token); //connects to the axios token attacher
    }

    //here is the value that we will return below
    const useAuthContextPackage = {
        token,
        // handleLogin,
        // handleLogout,
    };

    //Here is how we make everything available to the children via useAuth()
    //we set value to the useAuthContextPackage that contains the three things we created in this provider, and want to
    //make available to the children
    return (
        //This is what authProvider creates for us, an AuthContext
        //that contains the actual token received from getLoginTokenFromServer, and its associated functionality
        //useAuth() will now, provide what's in {useAuthContextPackage} too all of the {children} components
        //that derive from where we put useAuth()
        <AuthContext.Provider value={useAuthContextPackage}>
            {children}
        </AuthContext.Provider>);
};

//This is going to take in an email and password, and clones the functionality we use to make a request in postman, into the website

//TODO need to build the actual login route in the backend!
//the server is auth0's
export async function getLoginTokenFromServer(email: string, password: string) {
    console.log("In get login token from server", email, password);

    //anytime we need to use axios, or make a request to our backend
    //we will directly use httpClient, it works JUST like a call to axios
    //except it already has all our nice things added into it

    //here we make a post request, as we are making a post request to login route with our email and password
    //TODO change to auth0, the only thing that needs to change!
    //TODO his needs to hit auth0's API...but I need to find the route

    //we are using our httpClient to make the axios request to the backend 'login' route
    //As of now it is sending the email and password with the pose, and getting back the token associated
    //TODO we don't need a backend login route anymore here.... auth0 should do it for us
    let res = await httpClient.post("/login", {
        //data we want to send in the post
        email,
        password
    });
    //return the token coming back from the login route's reply
    //data.token tokenizes just the token from the body of the response
    return res.data.token;


}

//Checks to see if we've previously logged in and stored a token inside Local Storage (dev tools --> storage tab)
export function getTokenFromStorage() {
    const token = localStorage.getItem("token");
    if(token == null){
        return null;
    }

    const userToken = JSON.parse(token);
    //TODO what's this line here do exactly?
    return userToken?.token
}

//Single abstraction, that tucks away the CREATION of the React context itself
// here is where we set what is inside AuthContext, it's type is defined by AuthContextProps
//Whereever we use AuthContext we can now access the auth stuff globally to our children
const AuthContext = createContext<AuthContextProps | null>(null);


//Here is our custom hook, called useAuth, it's a SECOND abstraction that tucks away the USE of the Context
//Note: this is the only export from this file except for the provider itself
//Anywhere we want access to the context we created, we can just call this: context = useAuth (),
//and now we have access to the token, handleLogin function, and handleLogout function as denoted by the AuthContextProps type
//i.e. context.handleLogin(email, password) can now be used in the component that actually GETs the username and password
export const useAuth = () => {
    //it returns the thing that's inside AuthContext, our hook!
    return useContext(AuthContext);
}


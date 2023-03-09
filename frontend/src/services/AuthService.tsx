import {httpClient} from "./HttpService";
import {createContext, useContext, useState} from "react";

//TODO change email to "username" everywhere
//In this case, what we want to be able to access inside AuthContext are:
//The token itself (will be a string, or null)
//The handleLogin and handleLogout functions
export type AuthContextProps = {
    token: string | null,
    handleLogin: (email: string, password: string) => Promise<void>,
    handleLogout: () => void,
}

//Here is our custom hook, called useAuth
//Anywhere we want access to this stuff, we can just call this: context = useAuth (),
//and now we have access to the token, handleLogin function, and handleLogout function
//i.e. context.handleLogin(email, password) can now be used in the component that actually GETs the username and password
export const useAuth = () => {
    //it returns the thing that's inside AuthContext
    return useContext(AuthContext);
}


// here is where we set what is inside AuthContext, it's type is defined above in AuthContextProps
export const AuthContext = createContext<AuthContextProps | null>(null);


//A Provider is something React provides to us. It is something that means: hey
//this is a React component that does some sort of Context utility for us
//It comes in a very specific format as seen below. {children} refers to every other component that our AuthProvider wraps
//We want to move all our token stuff into this Provider.
export const AuthProvider = ({children}) => {

    //make state for the token
    const [token, setToken] = useState<string>("");

    //this is the functionality to take in a known email and password, and pass it to
    //the function that will get the token from the server, and set the token State once we have it
    const handleLogin = async (email, password) => {
        const newToken = await getLoginTokenFromServer(email, password);
        console.log("GOT A NEW TOKEN! " + newToken);
        setToken(newToken);
    };

    //this function just resets the token to nothing
    const handleLogout = () => {
        setToken("");
    };

    //here is the value that we will return below
    const value = {
        token,
        handleLogin,
        handleLogout,
    };

    //now how do we get all this stuff back? The provider IS a react COMPONENT
    //we want to return the wrap for our App stuff
    //{value} will be defined above, as the three things we created in this provider
    return (
        //This is what authProvider creates for us, an AuthContext, the context hook we defined above
        //that contains the actual token received from getLoginTokenFromServer
        //authContext will now, provide this {value} too all of the {children} components
        //that derive from where we put AuthContext

        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>);
};

//This is going to take in an email and password, and clones what we do in postman, into the website

//TODO need to build the actual login route in the backend!
export async function getLoginTokenFromServer(email: string, password: string) {
    console.log("In get login token from server", email, password);

    //anytime we need to use axios, or make a request to our backend
    //we will directly use httpClient, it works JUST like a call to axios
    //except it already has all our nice things added into it

    //here we make a post request, as we are making a post request to login route with our email and password
    let res = await httpClient.post("/login", {
        //data we want to send in the post
        email,
        password
    });

    //return the token coming back from the login route's reply
    //data.token tokenizes just the token from the body of the response
    return res.data.token;
}
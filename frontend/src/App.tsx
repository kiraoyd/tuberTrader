
import './App.css'
//import all our components
import {NavMain} from "./components/NavMain"
//import the token functionality we wrote in AuthProvider
import {AuthProvider} from "./services/AuthService";
import ReactDOM from "react-dom";
import {Auth0Provider} from "@auth0/auth0-react";



//TODO wrapping this in Auth0Provider, see if it works
//Here is where we create our App, that we mount in main.tsx
export default function App() {

    //token={token} in the tags will push {token} through the tree
    //AuthProvider makes everything we write into the AuthProvider React Component available to the entire app
    //NavMain is our parent component we used to abstract out the links and routes
    return (
        <Auth0Provider
            domain="dev-mqy8ug3j6mzegsua.us.auth0.com"
            clientId="xw775ux7oDyaS3jImVTAOiE4mD4alsCE"
            authorizationParams={{
                redirect_uri: window.location.origin
            }}
        >
        {/*<AuthProvider>*/}
        <div className="App">
            <NavMain/>
        </div>
        {/*</AuthProvider>*/}
        </Auth0Provider>
    );
}



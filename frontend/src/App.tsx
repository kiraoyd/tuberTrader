
import './App.css'
//import all our components
import {NavMain} from "./components/NavMain"
//import the token functionality we wrote in AuthProvider
import {AuthProvider} from "./services/AuthService";


//Here is where we create our App, that we mount in main.tsx
export default function App() {

    //token={token} in the tags will push {token} through the tree
    //AuthProvider makes everything we write into the AuthProvider React Component available to the entire app
    //NavMain is our parent component we used to abstract out the links and routes
    return (
        <AuthProvider>
        <div className="App">
            <NavMain/>
        </div>
        </AuthProvider>
    );
}

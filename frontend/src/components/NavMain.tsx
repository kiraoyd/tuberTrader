import {Link, Route, Routes} from "react-router-dom";
import {useAuth} from "../services/AuthService";
import {ProtectedRoute} from "./ProtectedRoute";
import {Login, Logout} from "./Login";
import Home from "./Home";


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
    const {token} = useAuth();

    return(
        <nav>
            <div className="menu">
                <PublicLinksView/>
                {
                    token ?
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
        <Link to="/logout">Logout</Link></>)
}


//Links shown if no token present (not logged in)
function NoAuthLinksView() {
    return(
        <>
            <Link to="/login"> Login </Link>
        </>
    )
}


//The routes are the logic flow: can a person GET to a page?
// NOTE:Even if there is no link complenting a route, a user can still go to the page by typing the url, unless we protect the route
//no need to have token state here, as we establish this with the ProtectedRoute parent we wrap token-only routes in
function NavRoutes(){
    return(
        <Routes>
            {/*<Route path="/match" element={<ProtectedRoute><Match/></ProtectedRoute>}*/}
            <Route path="/login" element={<Login/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path = "/logout" element={<Logout/>}></Route>
        </Routes>
    )
}
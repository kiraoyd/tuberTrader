import {
    Routes,
    Route,
    NavLink,
    Navigate,
    useNavigate
} from 'react-router-dom';
import { useAuth } from "../services/AuthService";
/*  TODO come back to this once we have auth0 working
//This will create a component that can wrap routes we want to restrict to token-only access
//Every route we WRAP in this, will be considered the "children" and will be login protected
//We get the token state here, so any children we wrap with this component will have token access
export const ProtectedRoute = ({children}) => {
    const{token} = useAuth();

    //if token is null, user is not logged in, so we redirect to the home page
    if(!token){
        return <Navigate to="/" replace/>
    }
    //otherwise they are logged in
    return children //render the protected routes (the children)
}
*/
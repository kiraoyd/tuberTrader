import {getTokenFromAuth0} from "../services/AuthService";
import{useAuth0} from "@auth0/auth0-react";


//this button exists to test that we can indeed get the token from auth0
//Stick <TokenButton /> in AuthLinksView to try it out
export function TokenButton() {
    const {getIdTokenClaims, getAccessTokenSilently} = useAuth0()

    function handleClick() {
        getAccessTokenSilently().then(res => {
            console.log("Access token: ", res);
        })
            .catch(error => {
                console.debug("Error getting the token : ", error.message)
            })
    }
    return(
        //the stuff in the { } is our javascript we want to run when the button is clicked
        <button onClick={ () => {
            handleClick()
        }
        }> Token
        </button>
    )
}


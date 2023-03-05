//Example component that makes a button
import {useEffect, useState} from "react";
//import axios
import axios from "axios";
export const Button = () => {

    //let's add some state to this component
    let [clicks, setClicks] = useState(0);
    //now lets add a state for username
    let [userName, setUserName] = useState("")

    return(
        //the stuff in the { } is our javascript we want to run when the button is clicked
        <button onClick={ () => {
            alert("clicked"); //this will cause a popup with the text on it
            //now lets define our setClicks hook method here
            setClicks(clicks + 1); //we can reference "clicks" in the button text to show its new value
            //write the setUserName function
            setUserName(userName + 'a');
        }
        }>
            Clicks: {clicks}
            userName: {userName}
        </button>
    )
}
//island profile component

import {useEffect} from "react";

//profile typing
export type ProfileProps = {
    //feilds of a profile we want to be able to display
    id: number,
    islandName: string,
    picture: string,
    turnipsHeld: number,
    pricePaid: number,

}

export function Profile(props: ProfileProps) {
    let{id, islandName, picture, turnipsHeld, pricePaid} = props;

    //TODO do I need this?
    useEffect(() => {
        console.log("Profile rerendered");
    });

    return (
        <div>
            <img src={picture} alt="Island Profile Image"/>
            <h2>{islandName}</h2>
            <p>Turnips holding: {turnipsHeld}</p>
            <p>Buying Price: {pricePaid}</p>
        </div>
    );
}


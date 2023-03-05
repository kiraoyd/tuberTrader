//Component for the homepage
import {useEffect, useState} from "react";
//import axios
import axios from "axios";

import {Users} from "./Users";

export default function Home() {
    return (<div>
            <Title/>
            <Subtitle/>
            <Users/>
        </div>
    );
}

//We can use these components anywhere else!
export function Title() {
    return (<h1>Tuber Trader</h1>)
}

export function Subtitle() {
    return (<h3>Watch em grow!</h3>)
}
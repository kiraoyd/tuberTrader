//This is where we set some default config stuff for an axios request
//It will allow us to not have to remember a bunch of stuff EVERY time we make an axios request
import axios from "axios";

// @ts-ignore
const serverIP = import.meta.env.VITE_BACKEND_IP;
// @ts-ignore

//this will tell us where to FIND our SERVER
const serverPort = import.meta.env.VITE_BACKEND_PORT;

//this will make it so, when we write something like
//axios.get("/login") that this will know where that login route is
//essentially it will know the address of our backend
const serverUrl = `http://${serverIP}:${serverPort}`;

// This is why I use Axios over Fetch
export const httpClient = axios.create({
	baseURL: serverUrl,
	headers: {
		"Content-type": "application/json"
	}
});
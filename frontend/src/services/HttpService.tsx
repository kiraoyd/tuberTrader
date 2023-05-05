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

// This is why we use Axios over Fetch, we can set up these series of defaults for axios
//We can also attach a token by default! that's easy!
export const httpClient = axios.create({
	baseURL: serverUrl,
	headers: {
		"Content-type": "application/json"
	}
});

//Lets us update axios with our token, to support axios's automatic backend auth requests
export const updateAxios = async (token: string) => {
	console.log("In update axios");
	httpClient.interceptors.request.use(
		async config => {

			// @ts-ignore
			config.headers = {
				'Authorization': `Bearer ${token}`,
				'Accept': 'application/json',
			};

			return config;
		},
		error => {
			console.log("REJECTED PROMISE");
			Promise.reject(error);
		});
};

//TODO trying to add an instance of axios that links to auth0

export const auth0Client = axios.create({
	baseURL: 'dev-mqy8ug3j6mzegsua.us.auth0.com',
})

//Lets us update axios with our token, to support axios's automatic backend auth requests
export const updateAxiosAuth0 = async (token: string) => {
	console.log("In update axios");
	auth0Client.interceptors.request.use(
		async config => {

			// @ts-ignore
			config.headers = {
				'Authorization': `Bearer ${token}`,
				'Accept': 'application/json',
			};

			return config;
		},
		error => {
			console.log("REJECTED PROMISE");
			Promise.reject(error);
		});
};



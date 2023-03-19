// //TODO this needs to be refactored to doggr new
// // Example component that gets back and displays users from our back end
// import {useEffect, useState} from "react";
// //import axios
// import axios from "axios";
//
// export const Users = () => {
//     //lets try to grab some users from the backend:
//     let [users, setUsers] = useState([]);
//
//     useEffect(() => {
//         //make an async function that will make the fetch call to the backend
//         const getUsers = async () => {
//             //now lets make a request to our backend using axios:
//             const users = await axios.get("http//localhost:8080/users"
//             ); //this route needs to eventually be an ENV variable
//             setUsers(users.data); //useEffect calls this after the fetch, to set users state with data
//         };
//         getUsers(); //calls the function above we declared
//     }, []); //after the fist run, all this code in useEffect only runs if the states we list in this array changes
//
//     return(
//         //time to return the html that will display the users we just got
//         //the javascript here converts the array of users, into single elements. So we manually iterate throuogh our
//         // users array, and turn each one of thoese users into its own line of html. Thats' what the mpa function does
//         //whats the users ? piece? This says, if we have users at all (not null), then render all the js here, otherwise...
//         //feed null to react (which tells react not to render ANYTHING).
//         // You could put something like and error page in place of null!
//         //if you wanted to do this, sub out :null for :<errorComponentIMade />
//         <div>
//             <h2> Users: </h2>
//             {   users ?
//                 <ul> {users.map((user: {email: string, name: string}) => <li key={user.email.toString()}>{user.name}-{user.email}</li>)}</ul>
//                 :null
//             }
//         </div>
//     )
// }
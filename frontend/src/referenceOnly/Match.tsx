// //doggr version: example of how to make a component that represents a
// //seperate "page" that has its own initial state and functionality
// //the way we export it is no different from other components, JS allows both
// //Importing: import Match from ./components/Match
//
// import {useEffect, useState} from 'react';
// import initialState, {getRandomProfile} from "../initialState";
// import {Profile} from "../components/Profile";
// import {Title} from "../components/Home";
//
// function Match() {
//     //First set up the overall state
//     //A variable to hold ouor current profile, and another one to hold all the profiles they like
//     let [currentProfile, setCurrentProfile] = useState(initialState.currentProfile);
//     let [likeHistory, setLikeHistory] = useState(initialState.likeHistory);
//
//     useEffect(() => {
//         console.log("-- App rerenders --");
//     });
//
//     //now we define the two functions we want to use inside of profile
//     let onLikeButtonClick = () => {
//         // this keeps allocations and copies to a minimum
//         let newLikeHistory = [...likeHistory, currentProfile];
//         let newProfile = getRandomProfile();
//         setCurrentProfile(newProfile);
//         setLikeHistory(newLikeHistory);
//     };
//
//     let onPassButtonClick = () => {
//         let newCurrentProfile = getRandomProfile();
//         setCurrentProfile(newCurrentProfile);
//     };
//
//     //Injecting props to Reach components
//     //We are feeding in all the properties to the profile so it has access to them
//     let profile = <Profile {...currentProfile}
//                            onLikeButtonClick={onLikeButtonClick}
//                            onPassButtonClick={onPassButtonClick}/>
//
//     return (
//         <>
//             <Title/>
//             {profile}
//         </>
//     );
// }
//
// export default Match;
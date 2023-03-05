
import {State, ProfileType} from "./types/tuberTypes";

//doggr version: template code


//this is literally the initial state where someone comes to our site
const initialState: { likeHistory: ProfileType[]; currentProfile: ProfileType } = {
    currentProfile: getRandomProfile(),
    likeHistory: [getRandomProfile(), getRandomProfile()],
};

export default initialState;

//This will get replaced by a call to the backend, and acts as a placeholder ONLY for now
export function getRandomProfile(): ProfileType {
    const idNum = Math.random() * 10000;

    return {
        imgUri: `https://loremflickr.com/300/300/animal?lock=${idNum}`,
        thumbUri: `https://loremflickr.com/75/75/animal?lock=${idNum}`,
        name: `Doggr${idNum}`,
        id: idNum,
    };
}
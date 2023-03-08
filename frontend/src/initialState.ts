
import {State, ProfileType} from "./types/tuberTypes";


//this is literally the initial state where someone comes to our sites homepage
const initialState: { currentProfile: ProfileType } = {
    currentProfile: getRandomProfile(), //TODO update this to show top 10
};

export default initialState;

//TODO this is just a placeholder, will be replaced with top ten
//This will get replaced by a call to the backend, and acts as a placeholder ONLY for now
export function getRandomProfile(): ProfileType {
    const idNum = Math.random() * 10000;

    return {
        id: idNum,
        islandName: `Island${idNum}`,

        picture: `https://loremflickr.com/300/300/animal?lock=${idNum}`,
        thumbnail: `https://loremflickr.com/75/75/animal?lock=${idNum}`,
        turnipsHeld: 10,
        pricePaid: 20,
    };
}
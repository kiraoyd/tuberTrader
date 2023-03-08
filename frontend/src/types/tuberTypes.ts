

//this is the state for the application itself, things that need to persist
//as a user interacts with the site
export type State = {

    //TODO placeholder, just shows one random island for now
    currentProfile: ProfileType,

    //topTen: Array<ProfileType>,  //TODO update to "it has top 10 profiles
};

//this is what an island profile will have in it
export type ProfileType = {
    id: number,
    islandName: string,
    picture: string,
    thumbnail: string,
    turnipsHeld: number,
    pricePaid: number
}
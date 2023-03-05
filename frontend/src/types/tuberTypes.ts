//doggr version

//this is the state for the application itself, things that need to persist
//as a user interacts with the site
export type State = {
    currentProfile: ProfileType,  //it has a profile
    likeHistory: Array<ProfileType>,  //it has a list of all profiles matched with
};

//this is what a profile will have in it
export type ProfileType = {
    imgUri: string,
    thumbUri: string,
    name: string,
    id: number,
}
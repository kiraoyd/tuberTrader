

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
    picture: string,
    thumbnail: string,
    created_at: string,
    ownerId: number,
    islandName: string,
    turnipsHeld: number,
    pricePaid: number
}

//In this case, what we want to be able to access inside AuthContext are:
//The token itself (will be a string, or null)
//The handleLogin and handleLogout functions
export type AuthContextProps = {
    token: string | null,
    handleLogin: (email: string, password: string) => Promise<void>,
    handleLogout: () => void,
}
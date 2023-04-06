import { createContext } from "react";

export const AuthContext = createContext({
    isLoggedIn: false,
    token: null,
    username: '',
    // userImage: null,
    userId: null,
    login: ()=>{},
    logout: ()=>{},
});
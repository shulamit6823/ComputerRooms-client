import {  useEffect, useState, type ReactNode } from "react"
import { UserContext } from "./UserContext";
import type { User } from "../types/User";
import { getCurrentUser } from "../api/authApi";

type UserProviderProps = {
    children: ReactNode;
};

const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<User|null>(null)
    useEffect(()=>{
        const token=localStorage.getItem("token");
        if(!token)
            return;
        getCurrentUser()
        .then((user)=>{
            setUser(user);
        })
        .catch((error)=>{
            console.log("getCurrentUser ERROR:", error);
            // localStorage.removeItem("token");
            setUser(null);
        }
        )
    },[] )
   

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider
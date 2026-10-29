import {  useEffect, useState, type ReactNode } from "react"
import { UserContext } from "./UserContext";
import type { User } from "../types/User";
import { getCurrentUser } from "../api/authApi";

type UserProviderProps = {
    children: ReactNode;
};

const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<User|null>(null)
    const [isLoading, setIsLoading] = useState(() => !!localStorage.getItem("token"))
    useEffect(()=>{
        const token=localStorage.getItem("token");
        if(!token)
            return;
        getCurrentUser()
        .then((user)=>{
            setUser(user);
        })
        .catch(()=>{
            localStorage.removeItem("token");
            setUser(null);
        }
        )
        .finally(()=>{
            setIsLoading(false);
        })
    },[] )


    return (
        <UserContext.Provider value={{ user, setUser, isLoading }}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider
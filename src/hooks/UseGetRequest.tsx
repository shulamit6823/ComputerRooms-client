import { useQuery } from "@tanstack/react-query"
import RequestApi from "../api/allRequestsApi"
import type { RequestCard } from "../types/RequestCard"
    import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import Request_teacherApi from "../api/teacherRequestsApi";


const UseGetRequest = () => {
    const context=useContext(UserContext);
    if(!context)
        throw new Error("אירעה שגיאה בהבאת המשתמש במערכת")
    const{user}=context;
    
    return useQuery<RequestCard[]>({
        queryKey: ["requests", user?.role],
        queryFn: user?.role === "Teacher" ? Request_teacherApi : RequestApi,
        enabled: !!user
    })
}
export default UseGetRequest
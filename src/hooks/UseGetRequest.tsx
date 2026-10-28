import { useQuery } from "@tanstack/react-query"
import RequestApi from "../api/requestsApi"
import type { RequestCard } from "../types/RequestCard"
    import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import Request_teacherApi from "../api/RequestForTeacherApi";


const UseGetRequest = () => {
    const context=useContext(UserContext);
    if(!context)
        throw new Error("אירעה שגיאה בהבאת המשתמש במערכת")
    const{user}=context;
    
    if (user?.role==="Teacher"){
        return useQuery<RequestCard[]>({
            queryKey:["teacher_request"],
            queryFn:Request_teacherApi
        })
    }
    else{
    return useQuery<RequestCard[]>({
        queryKey: ["requests"],
        queryFn: RequestApi
    })}
}
export default UseGetRequest
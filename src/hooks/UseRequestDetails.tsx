import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router"
import {ChangeRequestTypeApi, FinishRequestApi, oneRequestForResApi, TakeRequestApi} from "../api/requestDetailsApi"
import type { RequestDetails } from "../types/RequestDetails"
//מביא פרטים מלאים של פנייה אחת - לדף אחראית
export const UseOneRequestForRes = () => {
    const {id} = useParams()
    return useQuery<RequestDetails>({
        queryKey: ["request", id],
        queryFn: () => oneRequestForResApi(id!)
    })
}
//להעביר לטיפול
export const UseTakeRequest = () => {
    const queryClient = useQueryClient();
    const {id} = useParams()
    return useMutation({
        mutationFn:()=> TakeRequestApi(Number(id)),
         onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:["request", id]
            })
            queryClient.invalidateQueries({
                queryKey:["requests"]
            })
        }
    })
}
//לסיים פנייה
export const UseFinishRequest = () => {
    const queryClient = useQueryClient();
    const {id} = useParams()
    return useMutation({
        mutationFn:()=> FinishRequestApi(Number(id)),
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:["request", id]
            })
            queryClient.invalidateQueries({
                queryKey:["requests"]
            })
        }
    })
}
//לשנות סוג פנייה
export const UseChangeRequestType = () => {
    const queryClient = useQueryClient();
    const {id} = useParams()
    return useMutation({
        mutationFn:(type: string)=> ChangeRequestTypeApi(id!, type),
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:["request", id]
            })
            queryClient.invalidateQueries({
                queryKey:["requests"]
            })
        }
    })
}


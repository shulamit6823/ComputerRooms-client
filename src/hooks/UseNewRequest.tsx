import { useMutation, useQueryClient } from "@tanstack/react-query"
import { newRequestApi } from "../api/newRequestApi"

export const UseNewRequest=()=>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey:["new_request"],
        mutationFn:newRequestApi,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:["requests"]
            })
        }
    })
}
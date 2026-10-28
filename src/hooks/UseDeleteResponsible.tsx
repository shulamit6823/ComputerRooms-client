import {  useMutation, useQueryClient } from "@tanstack/react-query";
import deleteResponsibleApi from "../api/deleteResponsibleApi";

export const Usedeleteresponsible = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteResponsibleApi,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:["responsible"]
            })
        }

    });
};
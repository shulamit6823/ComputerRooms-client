import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AddMessageResponApi, AddMessageTeacherApi } from "../api/Addmessages"
import { useParams } from "react-router"


export const UseAddMessageTeacher = () => {
    const queryClien = useQueryClient();

    const { id } = useParams();
    return useMutation({
        mutationKey: ["message_teacher"],
        mutationFn: (desc: string) => AddMessageTeacherApi(id!, desc),
        onSuccess: () => {
            queryClien.invalidateQueries({
                queryKey: ["request", id]
            })
        }
    })
}
export const UseAddMessageRespon = () => {
    const queryClien = useQueryClient();

    const { id } = useParams()
    return useMutation({
        mutationKey: ["message_internal"],
        mutationFn: (desc: string) => AddMessageResponApi(id!, desc),
        onSuccess: () => {
            queryClien.invalidateQueries({
                queryKey: ["request", id]
            })
        }
    })
}
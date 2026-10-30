import { useMutation } from "@tanstack/react-query"
import AddResponsible from "../api/addResponsibleApi"

const useAddResponsible=()=>{
     return useMutation({
        mutationFn: AddResponsible
     })
}
export default useAddResponsible
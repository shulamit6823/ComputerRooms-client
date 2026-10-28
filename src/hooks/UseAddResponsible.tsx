import { useMutation } from "@tanstack/react-query"
import AddResponsible from "../api/addresponsible"

const useAddResponsible=()=>{
     return useMutation({
        mutationFn: AddResponsible
     })
}
export default useAddResponsible
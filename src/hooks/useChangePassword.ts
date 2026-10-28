import { useMutation } from "@tanstack/react-query"
import ChangePasswordApi from "../api/ChangePasswordApi"

const useChangePassword = () => {
    return useMutation({
        mutationFn:ChangePasswordApi
    })
}
export default useChangePassword
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/authApi";

export const useRegister = () => {
    return useMutation({
        mutationFn: registerUser
    });
};
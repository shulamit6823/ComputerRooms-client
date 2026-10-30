import type { ChangePasswordForm } from "../types/ChangePasswordForm";
import { getErrorMessage } from "./getErrorMessage";

const ChangePasswordApi=async(data:ChangePasswordForm)=>{
    const response= await fetch("/api/auth/change-password",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)

    })

    if (!response.ok)
        throw new Error(await getErrorMessage(response, "אירעה שגיאה בהחלפת הסיסמה"));
    return response.json();


}
export default ChangePasswordApi
import type { ChangePasswordForm } from "../types/changePassword";

const ChangePasswordApi=async(data:ChangePasswordForm)=>{
    const response= await fetch("/api/auth/change-password",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)

    })
   
    //     throw new Error("אירעה שגיאה בהחלפת הסיסמה")
   
    if (!response.ok) {
     const error = await response.json();
     throw new Error(error.title);
    }
    return response.json();


}
export default ChangePasswordApi
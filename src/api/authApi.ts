import type { LoginForm } from "../types/LoginForm";
import type { RegisterForm } from "../types/RegisterForm"


export const registerUser= async(data:RegisterForm)=>{
    const response = await fetch("/api/auth/register", {
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    });
    if(!response.ok)
        throw new Error("הרשמה נכשלה")
    return response.json();
};

export const  LoginUser=async(data:LoginForm)=>{
    const response=await fetch("/api/auth/login",
        {
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        }
    );
    if(!response.ok)
        {
            const errorData = await response.json();
            throw new Error(errorData.title ||"ההתחברות נכשלה")
        }
    return response.json();
}  

export const  getCurrentUser=async()=>{
    const token=localStorage.getItem("token")
    const response=await fetch("/api/auth/me",{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })  
    
    if(!response.ok)
        throw new Error("לא ניתן לקבל את פרטי המשתמש")
    return response.json();
}
import type { NewResponsible } from "../types/addRegister";

const AddResponsible=async (data:NewResponsible)=>{
    const token=localStorage.getItem("token")
    const response=await fetch("api/manager/responsibles",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(data)
    })
    console.log(response);
    
    if(response.status==409){
        throw new Error("כתובת המייל כבר קיימת במערכת")
    }
    else if(!response.ok){
        throw new Error("אירעה שגיאה בהוספת אחראית")
    }
    else{
        return response;
    }
}
export default AddResponsible

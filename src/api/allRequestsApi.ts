import { getErrorMessage } from "./getErrorMessage";

const RequestApi=async ()=>{
    const token=localStorage.getItem("token")
    const response= await fetch("/api/requests",{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });

    if(!response.ok) {
        throw new Error(await getErrorMessage(response, "אירעה שגיאה בטעינת הפניות"));
    }
    return await response.json();
  
}
export default RequestApi
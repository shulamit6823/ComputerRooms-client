import type { Responsible } from "../types/Responsible";
import { getErrorMessage } from "./getErrorMessage";

const getResponsibles= async():Promise<Responsible[]>=>{
    const token=localStorage.getItem("token");

    const response =await fetch("/api/manager/responsibles",{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    if(!response.ok)
        throw new Error(await getErrorMessage(response, "אירעה שגיאה בטעינת האחראיות"))
    else{
    return response.json();

    }
}
export default getResponsibles
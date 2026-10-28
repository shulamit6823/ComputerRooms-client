import type { Responsible } from "../types/Responsible";

const getResponsibles= async():Promise<Responsible[]>=>{
    const token=localStorage.getItem("token");

    const response =await fetch("/api/manager/responsibles",{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    if(!response.ok)
        throw new Error("failed !!")
    else{
    return response.json();

    }
}
export default getResponsibles
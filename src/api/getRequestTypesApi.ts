import { getErrorMessage } from "./getErrorMessage";

export const GetRequestTypesApi = async () => {
    const token = localStorage.getItem("token")
    const response = await fetch("/api/requests/types",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if(!response.ok){
            throw new Error(await getErrorMessage(response, "אירעה שגיאה בהבאת סוגי הפניות"))
        }
        return response.json();
}
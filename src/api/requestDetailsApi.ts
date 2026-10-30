import type { RequestDetails } from "../types/RequestDetails";
import { getErrorMessage } from "./getErrorMessage";

//כל פרטי הפנייה
export const oneRequestForResApi = async (id: string):Promise<RequestDetails> => {
    const token = localStorage.getItem("token");
    const response = await fetch(`/api/requests/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (!response.ok)
        throw new Error(await getErrorMessage(response, `אירעה שגיאה בהבאת הפרטים של פנייה ${id}`));
    return response.json();
}
//אחראית לוקחת פנייה
export const TakeRequestApi = async (id: number) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`/api/requests/${id}/take`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (!response.ok)
        throw new Error(await getErrorMessage(response, `אירעה שגיאה בלקיחת פנייה ${id} לטיפול`));
    return response.json();
}
//אחראית סיימה פנייה
export const FinishRequestApi = async (id: number) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`/api/requests/${id}/complete`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (!response.ok)
        throw new Error(await getErrorMessage(response, `אירעה שגיאה בסיום פנייה ${id}`));
    return response.json();
}
//אחראית משנה סוג הפניה
//השתמשתי
export const ChangeRequestTypeApi = async (id: string, type: string) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`/api/requests/${id}/type`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            requestType: type
        })
    });
    if (!response.ok)
        throw new Error(await getErrorMessage(response, `אירעה שגיאה בעדכון הסוג של פנייה ${id}`));
    return response.json();
}

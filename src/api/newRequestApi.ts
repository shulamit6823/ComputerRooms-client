import type { CreateRequest } from "../types/CreateRequest";
import { getErrorMessage } from "./getErrorMessage";

export const newRequestApi = async (requestData: CreateRequest) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`/api/requests/`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
    });

    if (!response.ok)
        throw new Error(await getErrorMessage(response, "אירעה שגיאה ביצירת הפנייה"));

    return response.json();
}

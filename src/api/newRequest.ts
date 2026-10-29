import type { CreateRequest } from "../types/CreateRequest";

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

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const firstValidationError = errorData?.errors
            ? Object.values(errorData.errors).flat()[0]
            : null;
        throw new Error(
            (firstValidationError as string) || errorData?.title || "אירעה שגיאה ביצירת הפנייה"
        );
    }

    return response.json();
}

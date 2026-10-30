// מחזירה את הודעת השגיאה שהשרת שלח, או הודעת גיבוי אם אין כזאת
export const getErrorMessage = async (response: Response, fallback: string): Promise<string> => {
    // קריאת גוף התשובה. אם אין JSON - null
    const errorData = await response.json().catch(() => null);

    // שגיאת ולידציה: { errors: { RoomName: ["..."] } } - לוקחים את ההודעה הראשונה
    if (errorData?.errors) {
        const firstError = Object.values(errorData.errors).flat()[0];
        if (typeof firstError === "string")
            return firstError;
    }

    // שגיאה עסקית: { title: "..." }
    if (errorData?.title)
        return errorData.title;

    return fallback;
}

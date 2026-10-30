import type { LoginForm } from "../types/LoginForm";
import type { RegisterForm } from "../types/RegisterForm"
import { getErrorMessage } from "./getErrorMessage";


export const registerUser = async (data: RegisterForm) => {
    const response = await fetch("/api/auth/register", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

     if(response.status === 409)
            throw new Error("המייל כבר רשום במערכת. אםהאתאחראיית, הירשמיכמורה עם מייל אחר.")
    if (!response.ok)
        throw new Error(await getErrorMessage(response, "הרשמה נכשלה"));

    return response.json();

};

export const LoginUser = async (data: LoginForm) => {
    const response = await fetch("/api/auth/login",
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );
    if (!response.ok)
        throw new Error(await getErrorMessage(response, "ההתחברות נכשלה"));
    return response.json();
}

export const getCurrentUser = async () => {
    const token = localStorage.getItem("token")
    const response = await fetch("/api/auth/me", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (!response.ok)
        throw new Error(await getErrorMessage(response, "לא ניתן לקבל את פרטי המשתמש"));
    return response.json();
}
import useChangePassword from "../hooks/useChangePassword"
import Box from '@mui/material/Box';
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import type { confirmPassword } from "../types/confirmPassword";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router";

const ChangePassword = () => {
    const TEMPORARY_PASSWORD = "12345678";
    const { mutate, isError, isPending, error } = useChangePassword();
    const { register, getValues, handleSubmit, formState: { errors } } = useForm<confirmPassword>();
    const context = useContext(UserContext)
    const navigate = useNavigate()
    const onSubmit = (data: confirmPassword) => {
        if (!context)
            throw new Error("UserContext must be used inside UserProvider");
        const { user } = context;
        if (!user)
            return;
        mutate({
            email: user.email,
            currentPassword: TEMPORARY_PASSWORD,
            newPassword: data.password
        },
            {
                onSuccess: (data) => {
                    console.log("change password response:", data);
                     localStorage.setItem("token", data.token)
                     navigate("/responsible/requests")
                }
            }
        )

    }
    if (isError)
        return <p>{error?.message}</p>
    if (isPending)
        return <p>שולח...</p>

    return (
        <Box
            component="form"
            sx={{
                maxWidth: 210,
                margin: "40px auto",
                display: "flex",
                flexDirection: "column",
                gap: 2
            }}

            onSubmit={handleSubmit(onSubmit)}
            //sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
        >
            <Typography variant="h4">
                החלפת סיסמא
            </Typography>
            <Stack spacing={2}>

                <TextField
                    id="filled-password-input"
                    //label="Password"
                    autoComplete="current-password"
                    variant="filled"
                    label="בחר סיסמא חדשה"
                    type="password"
                    placeholder="הכנס את הסיסמא שלך"
                    {...register("password", {
                        required: "סיסמה היא שדה חובה",
                        minLength: {
                            value: 8,
                            message: "הסיסמה חייבת להכיל לפחות 8 תווים"
                        }
                    })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />


                <TextField
                    id="filled-password-input"
                    //label="Password"
                    autoComplete="current-password"
                    variant="filled"
                    label="אימות הסיסמא"
                    type="password"
                    placeholder="הכנס את הסיסמא שלך"
                    {...register("confirmPassword", {
                        required: "אימות סיסמה היא שדה חובה",
                        validate: () => {
                            if (getValues("password") !== getValues("confirmPassword")) {
                                return "סיסמה ואימות סיסמה חייבים להיות זהים";
                            }
                        }
                    })}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                />


            </Stack>

            <Button type="submit" variant="contained" >
                החלפת סיסמא
            </Button>

        </Box>
    )

}

export default ChangePassword
import { useForm } from "react-hook-form";
import type { RegisterForm } from "../types/RegisterForm";
import { Link, useNavigate } from "react-router";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useRegister } from "../hooks/Useregister";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const RegisterPage = () => {

    const navigate = useNavigate();
    const context = useContext(UserContext);
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>()
    const { mutate, isPending, isError, error } = useRegister();

    const onSubmit = (data: RegisterForm) => {
        mutate(data, {
            onSuccess: (data) => {
                localStorage.setItem("token", data.token);
                context?.setUser(data.user);
                navigate("/teacher/requests");
            }

        })
    }



    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ maxWidth: 400, margin: "40px auto", display: "flex", flexDirection: "column", gap: 2 }}
        >
            <Typography variant="h4">הרשמה</Typography>

            <TextField
                label="הכנס את השם שלך"
                placeholder="השם שלך"
                {...register("name", {
                    required: "שם הוא שדה חובה"
                })}
                error={!!errors.name}

            />
            {errors.name && <p>{errors.name.message}</p>}

            <TextField
                label="הכנס את המייל שלך"
                type="email"
                placeholder="הכנס את המייל שלך"
                {...register("email", {
                    required: "מייל הוא שדה חובה",
                })}
                error={!!errors.email}
            />
            {errors.email && <p>{errors.email.message}</p>}

            <TextField
                label="בחר סיסמא"
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

            <Button type="submit" variant="contained" disabled={isPending}>הרשמה</Button>


            {isPending && <Typography>מתחבר...</Typography>}

            {isError && (
                <Typography color="error">
                    {error.message}
                </Typography>
            )}
            <p>
                כבר יש לך חשבון?
                <Link to={"/login"} >להתחברות</Link>

            </p>
        </Box>

    )
}

export default RegisterPage
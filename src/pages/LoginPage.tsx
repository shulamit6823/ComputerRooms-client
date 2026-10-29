import type { LoginForm } from "../types/LoginForm";
import { useForm } from "react-hook-form";
import { LoginUser } from "../api/authApi";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import { Box, TextField, Button, Typography } from "@mui/material";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

export const Login = () => {

    const navigate = useNavigate();
    const context=useContext(UserContext)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginForm>();
    
    const {
        mutate,
        isPending,
        isError,
        error
    } = useMutation({
        mutationFn: LoginUser,
        onSuccess: (data) => {//מכיל טוקן
            if(data.token){
                localStorage.setItem("token", data.token);}
            if(!context)
                throw new Error("UserContext must be used inside UserProvider");
            const {setUser}=context;

            setUser({
                id:data.user.id,
                name:data.user.name,
                role:data.user.role,
                email:data.user.email
            })
            if(data.requiresPasswordChange)
            {
                window.alert("עליך להחליף את הסיסמה לפני הכניסה למערכת")
                navigate("/change-password");
            }
            else if (data.user.role === "Manager")
                navigate("/manager");
            else if (data.user.role === "Teacher")
                navigate("/teacher/requests");
            else
                navigate("/responsible/requests");
        }
    });

    const onSubmit = (data: LoginForm) => {//מכיל את האובייקט USER
        mutate(data);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                maxWidth: 400,
                margin: "40px auto",
                display: "flex",
                flexDirection: "column",
                gap: 2
            }}
        >
            <Typography variant="h4">
                התחברות
            </Typography>

            <TextField
                type="email"
                label="הכנס את המייל שלך"
                {...register("email", {
                    required: "מייל הוא שדה חובה"
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
            />

            <TextField
                type="password"
                label="הכנס את הסיסמה שלך"
                {...register("password", {
                    required: "סיסמה היא שדה חובה"
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
            />

            <Button type="submit" variant="contained" disabled={isPending}>
                התחברות
            </Button>

            {isPending && <Typography>מתחבר...</Typography>}

            {isError && (
                <Typography color="error">
                   {error.message}
                </Typography>
            )}
            <p>
                 אין לך חשבון?
                <Link to={"/register"} >להרשמה</Link>

            </p>
        </Box>
    );
};

export default Login;
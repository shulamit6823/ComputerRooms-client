import type { LoginForm } from "../types/LoginForm";
import { useForm } from "react-hook-form";
import { LoginUser } from "../api/authApi";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import { Alert, Avatar, Box, Button, Card, CardContent, CircularProgress, InputAdornment, Link as MuiLink, TextField, Typography } from "@mui/material";
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
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
            sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                px: 2,
                background: "radial-gradient(circle at 15% 20%, #e0f7fa 0%, transparent 45%), radial-gradient(circle at 85% 80%, #f3e5f5 0%, transparent 45%), #fafbfd",
            }}
        >
            <Box
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    py: { xs: 4, md: 6 },
                }}
            >
            <Card
                variant="outlined"
                sx={{
                    width: "100%",
                    maxWidth: 420,
                    borderRadius: 4,
                    border: "1px solid #e3e7ed",
                    boxShadow: "0 12px 40px rgba(120, 100, 160, 0.12)",
                    textAlign: "right",
                }}
            >
                <Box sx={{ height: 5, background: "linear-gradient(to left, #4dd0e1, #ba68c8)" }} />
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", mb: 3 }}>
                        <Avatar
                            sx={{
                                width: 56,
                                height: 56,
                                mb: 2,
                                background: "linear-gradient(135deg, #4dd0e1, #ba68c8)",
                                boxShadow: "0 6px 18px rgba(186, 104, 200, 0.35)",
                            }}
                        >
                            <ComputerOutlinedIcon />
                        </Avatar>
                        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: "text.primary" }}>
                            ברוכה הבאה!
                        </Typography>
                        <Typography sx={{ color: "text.secondary", mt: 0.75, fontSize: 15 }}>
                            התחברי כדי לדווח על תקלות בחדרי המחשבים ולעקוב אחרי הטיפול בהן
                        </Typography>
                        <Box sx={{ mt: 1.5, display: "flex", gap: 0.75 }}>
                            {["#4dd0e1", "#9fa8da", "#ba68c8"].map(c => (
                                <Box key={c} sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: c }} />
                            ))}
                        </Box>
                    </Box>

                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2.5
                        }}
                    >
                        <TextField
                            type="email"
                            label="הכנס את המייל שלך"
                            fullWidth
                            {...register("email", {
                                required: "מייל הוא שדה חובה"
                            })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <MailOutlineIcon sx={{ color: "#9aa5b4" }} />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />

                        <TextField
                            type="password"
                            label="הכנס את הסיסמה שלך"
                            fullWidth
                            {...register("password", {
                                required: "סיסמה היא שדה חובה"
                            })}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockOutlinedIcon sx={{ color: "#9aa5b4" }} />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />

                        {isError && (
                            <Alert severity="error">
                                {error.message}
                            </Alert>
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={isPending}
                            sx={{
                                borderRadius: 2.5,
                                fontWeight: 700,
                                fontSize: 16,
                                py: 1.25,
                                boxShadow: "none",
                                background: "linear-gradient(to left, #4dd0e1, #ba68c8)",
                                "&:hover": { boxShadow: "0 4px 14px rgba(186,104,200,0.35)" },
                                "&.Mui-disabled": { color: "#fff", opacity: 0.75 },
                            }}
                        >
                            {isPending ? <CircularProgress size={26} thickness={5} sx={{ color: "#fff" }} /> : "התחברות"}
                        </Button>

                        <Box
                            sx={{
                                mt: 1,
                                pt: 2.5,
                                borderTop: "1px solid #eef0f4",
                                textAlign: "center",
                            }}
                        >
                            <Typography sx={{ color: "text.secondary", fontSize: 15 }}>
                                מורה, עוד לא נרשמת?{" "}
                                <MuiLink
                                    component={Link}
                                    to="/register"
                                    underline="hover"
                                    sx={{ fontWeight: 700, color: "#9b4dbf" }}
                                >
                                    להרשמה
                                </MuiLink>
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
            </Box>
        </Box>
    );
};

export default Login;
import { useForm } from "react-hook-form";
import type { RegisterForm } from "../types/RegisterForm";
import { Link, useNavigate } from "react-router";
import { Alert, Avatar, Box, Button, Card, CardContent, CircularProgress, InputAdornment, Link as MuiLink, TextField, Typography } from "@mui/material";
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import { useRegister } from "../hooks/useRegister";
import { useContext, type ReactNode } from "react";
import { UserContext } from "../context/UserContext";

// אייקון אפור בתחילת השדה
const startIcon = (icon: ReactNode) => ({
    input: {
        startAdornment: <InputAdornment position="start">{icon}</InputAdornment>,
    },
});
const iconSx = { color: "#9aa5b4" };

const RegisterPage = () => {

    const navigate = useNavigate();
    const context = useContext(UserContext);
    // לטופס יש שדה נוסף - אימות סיסמה - שלא נשלח לשרת
    const { register, getValues, handleSubmit, formState: { errors } } = useForm<RegisterForm & { confirmPassword: string }>()
    const { mutate, isPending, isError, error } = useRegister();

    const onSubmit = (data: RegisterForm & { confirmPassword: string }) => {
        mutate({ name: data.name, email: data.email, password: data.password }, {
            onSuccess: (data) => {
                localStorage.setItem("token", data.token);
                context?.setUser(data.user);
                navigate("/teacher/requests");
            }

        })
    }



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
                        maxWidth: 440,
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
                                <PersonAddAltOutlinedIcon />
                            </Avatar>
                            <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: "text.primary" }}>
                                הצטרפות למערכת
                            </Typography>
                            <Typography sx={{ color: "text.secondary", mt: 0.75, fontSize: 15 }}>
                                מורה? הירשמי כדי לדווח על תקלות בחדרי המחשבים ולעקוב אחרי הטיפול בהן
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
                            sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
                        >
                            <TextField
                                label="הכנס את השם שלך"
                                fullWidth
                                {...register("name", {
                                    required: "שם הוא שדה חובה"
                                })}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                                slotProps={startIcon(<PersonOutlineIcon sx={iconSx} />)}
                            />

                            <TextField
                                label="הכנס את המייל שלך"
                                type="email"
                                fullWidth
                                {...register("email", {
                                    required: "מייל הוא שדה חובה",
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                slotProps={startIcon(<MailOutlineIcon sx={iconSx} />)}
                            />

                            <TextField
                                label="בחר סיסמא"
                                type="password"
                                fullWidth
                                {...register("password", {
                                    required: "סיסמה היא שדה חובה",
                                    minLength: {
                                        value: 8,
                                        message: "הסיסמה חייבת להכיל לפחות 8 תווים"
                                    }
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                slotProps={startIcon(<LockOutlinedIcon sx={iconSx} />)}
                            />

                            <TextField
                                label="אימות סיסמא"
                                type="password"
                                fullWidth
                                {...register("confirmPassword", {
                                    required: "אימות סיסמה הוא שדה חובה",
                                    validate: () => {
                                        if (getValues("password") !== getValues("confirmPassword")) {
                                            return "סיסמה ואימות סיסמה חייבים להיות זהים";
                                        }
                                    }
                                })}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword?.message}
                                slotProps={startIcon(<VerifiedUserOutlinedIcon sx={iconSx} />)}
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
                                {isPending ? <CircularProgress size={26} thickness={5} sx={{ color: "#fff" }} /> : "הרשמה"}
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
                                    כבר יש לך חשבון?{" "}
                                    <MuiLink
                                        component={Link}
                                        to="/login"
                                        underline="hover"
                                        sx={{ fontWeight: 700, color: "#9b4dbf" }}
                                    >
                                        להתחברות
                                    </MuiLink>
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    )
}

export default RegisterPage

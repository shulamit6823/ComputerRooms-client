import useChangePassword from "../hooks/useChangePassword"
import Box from '@mui/material/Box';
import { Alert, Avatar, Button, Card, CardContent, CircularProgress, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import LockResetRoundedIcon from '@mui/icons-material/LockResetRounded';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import { useForm } from "react-hook-form";
import type { confirmPassword } from "../types/confirmPassword";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router";

const iconSx = { color: "#9aa5b4" };

const pageSx = {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    px: 2,
    py: { xs: 4, md: 6 },
    background: "radial-gradient(circle at 15% 20%, #e0f7fa 0%, transparent 45%), radial-gradient(circle at 85% 80%, #f3e5f5 0%, transparent 45%), #fafbfd",
};

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
                    localStorage.setItem("token", data.token)
                    navigate("/responsible/requests")
                }
            }
        )

    }

    if (isPending)
        return (
            <Box sx={pageSx}>
                <CircularProgress size={44} thickness={4.5} />
            </Box>
        )

    return (
        <Box sx={pageSx}>
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
                            <LockResetRoundedIcon />
                        </Avatar>
                        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: "text.primary" }}>
                            החלפת סיסמא
                        </Typography>
                        <Typography sx={{ color: "text.secondary", mt: 0.75, fontSize: 15 }}>
                            זו הכניסה הראשונה שלך. כדי להמשיך, יש לבחור סיסמה חדשה במקום הסיסמה הזמנית
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
                        noValidate
                        autoComplete="off"
                    >
                        <Stack spacing={2.5}>

                            <TextField
                                autoComplete="current-password"
                                label="בחר סיסמא חדשה"
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
                                slotProps={{ input: { startAdornment: <InputAdornment position="start"><LockOutlinedIcon sx={iconSx} /></InputAdornment> } }}
                            />


                            <TextField
                                autoComplete="current-password"
                                label="אימות הסיסמא"
                                type="password"
                                fullWidth
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
                                slotProps={{ input: { startAdornment: <InputAdornment position="start"><VerifiedUserOutlinedIcon sx={iconSx} /></InputAdornment> } }}
                            />

                            {isError && <Alert severity="error">{error?.message}</Alert>}


                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{
                                    borderRadius: 2.5,
                                    fontWeight: 700,
                                    fontSize: 16,
                                    py: 1.25,
                                    boxShadow: "none",
                                    background: "linear-gradient(to left, #4dd0e1, #ba68c8)",
                                    "&:hover": { boxShadow: "0 4px 14px rgba(186,104,200,0.35)" },
                                }}
                            >
                                החלפת סיסמא
                            </Button>
                        </Stack>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )

}

export default ChangePassword

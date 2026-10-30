import { Alert, Box, Card, CardContent, CircularProgress, InputAdornment, TextField, Typography } from "@mui/material";
import useAddResponsible from "../hooks/UseAddResponsible";
import { useForm } from "react-hook-form";
import type { NewResponsible } from "../types/NewResponsible";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutlined';
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
type AddResponsibleProps = {
    onCancel: () => void;
}

const iconSx = { color: "#9aa5b4" };

const AddResponsible = ({ onCancel }: AddResponsibleProps) => {

    const [showmessage, setShowmessage] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<NewResponsible>();
    const { mutate, isPending, isError, error } = useAddResponsible()
    const queryClient = useQueryClient();
    const onSubmit = (data: NewResponsible) => {
        mutate(data, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ["responsible"]
                });
                setShowmessage(true);
            }

        }
        );
    }

    return (
        <Card
            variant="outlined"
            sx={{
                maxWidth: 560,
                borderRadius: 4,
                border: "1px solid #e3e7ed",
                boxShadow: "0 4px 20px rgba(31, 35, 64, 0.06)",
            }}
        >
            <Box sx={{ height: 4, background: "linear-gradient(to left, #4dd0e1, #ba68c8)" }} />
            <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
            {
                showmessage ? (
                <>
                <Alert severity="success" sx={{ mb: 2 }}>
                    האחראית נוספה בהצלחה.
                    <br />
                    הסיסמה הזמנית שלה היא: <strong>12345678</strong>
                    <br />
                    יש להעביר את הסיסמה לאחראית.
                </Alert>
            <Button
                onClick={onCancel}
                variant="contained"
                sx={{ borderRadius: 2.5, fontWeight: 700, px: 4, boxShadow: "none", background: "linear-gradient(to left, #4dd0e1, #ba68c8)" }}
            >
                אישור
            </Button>
           </>
            ):
           ( <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                autoComplete="off"
            >
                <Typography sx={{ fontWeight: 700, fontSize: 18, color: "#1f2340", mb: 2 }}>
                    אחראית חדשה
                </Typography>
                <Stack spacing={2}>
                    <TextField
                        label="הכנס את שם האחראית"
                        required
                        fullWidth
                        {...register("name",
                            {
                                required: "חובה להכניס שם אחראית"
                            }
                        )}

                        error={!!errors.name}
                        helperText={errors.name?.message}
                        slotProps={{ input: { startAdornment: <InputAdornment position="start"><PersonOutlineIcon sx={iconSx} /></InputAdornment> } }}
                    />
                    <TextField
                        label="הכנס את המייל של האחראית"
                        required
                        type="email"
                        fullWidth
                        {...register("email", {
                            required: "חובה להכניס מייל של אחראית",

                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        slotProps={{ input: { startAdornment: <InputAdornment position="start"><MailOutlineIcon sx={iconSx} /></InputAdornment> } }}
                    />

                    {isError && <Alert severity="error">{error.message}</Alert>}

                    <Stack direction="row" spacing={1.5} sx={{ justifyContent: "flex-end" }}>
                        <Button
                            onClick={onCancel}
                            variant="outlined"
                            sx={{
                                borderRadius: 2.5,
                                fontWeight: 600,
                                px: 3,
                                color: "#9b4dbf",
                                borderColor: "#e2c4f2",
                                "&:hover": { borderColor: "#d77cf5", bgcolor: "#fbf4fe" },
                            }}
                        >
                            ביטול
                        </Button>

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isPending}
                            sx={{
                                borderRadius: 2.5,
                                fontWeight: 700,
                                px: 4,
                                minWidth: 120,
                                boxShadow: "none",
                                background: "linear-gradient(to left, #4dd0e1, #ba68c8)",
                                "&:hover": { boxShadow: "0 4px 14px rgba(186,104,200,0.35)" },
                                "&.Mui-disabled": { color: "#fff", opacity: 0.75 },
                            }}
                        >
                            {isPending ? <CircularProgress size={22} thickness={5} sx={{ color: "#fff" }} /> : "הוספה"}
                        </Button>
                    </Stack>

                </Stack>
            </Box >
            )
            }
            </CardContent>
        </Card>

    )
}

export default AddResponsible

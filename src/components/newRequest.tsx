import { Alert, Box, Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material"
import { UseNewRequest } from "../hooks/UsenewRequest"
import { useForm } from "react-hook-form"
import MenuItem from "@mui/material/MenuItem";
import type { CreateRequest } from "../types/CreateRequest";
import { useNavigate } from "react-router";
import { UseRequestTypes } from "../hooks/useRequestTYpes";
import { useState } from "react";

export const NewRequest = () => {
    const { mutate, isError, isPending, error } = UseNewRequest()
    const { data: requestTypes, isPending: typesLoading, isError: typesError } = UseRequestTypes();
    const { handleSubmit, register, formState: { errors } } = useForm<CreateRequest>();
    const navigate = useNavigate()
    // התאריך של היום לפי השעון המקומי, בפורמט YYYY-MM-DD
    const [today] = useState(() => new Date().toLocaleDateString("en-CA"));

    const onSubmit = (data: CreateRequest) => {
        mutate(data, {
            onSuccess() {
                navigate("/teacher/requests")
            },
        });

    }
    const onCancel = () => {
        navigate("/teacher/requests")
    }

    return (
        <Box sx={{ px: { xs: 2, md: 4 }, pt: { xs: 3, md: 5 }, pb: 4, textAlign: "right" }}>
            <Box sx={{ maxWidth: 640, mx: "auto" }}>
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: "text.primary" }}>
                        פנייה חדשה
                    </Typography>
                    <Typography sx={{ color: "text.secondary", mt: 0.5 }}>
                        מלאי את פרטי התקלה, והאחראית תטפל בה בהקדם
                    </Typography>
                    <Box sx={{ mt: 1.5, display: "flex", gap: 0.75 }}>
                        {["#4dd0e1", "#9fa8da", "#ba68c8"].map(c => (
                            <Box key={c} sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: c }} />
                        ))}
                    </Box>
                </Box>

                <Card
                    variant="outlined"
                    sx={{
                        borderRadius: 3,
                        border: "1px solid #d0d7e2",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                    }}
                >
                    <Box sx={{ height: 4, background: "linear-gradient(to left, #4dd0e1, #ba68c8)" }} />
                    <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
                        <Box
                            component="form"
                            onSubmit={handleSubmit(onSubmit)}
                            noValidate
                            autoComplete="off"
                        >
                            <Stack spacing={2.5}>
                                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                                    <TextField
                                        label="מספר החדר"
                                        required
                                        fullWidth
                                        {...register("roomName", {
                                            required: "חובה להכניס מספר החדר"
                                        })}
                                        error={!!errors.roomName}
                                        helperText={errors.roomName?.message}
                                    />
                                    <TextField
                                        label="מספר המחשב"
                                        fullWidth
                                        helperText="לא חובה"
                                        {...register("computerNumber")}
                                    />
                                </Stack>

                                <TextField
                                    label="סוג פנייה"
                                    required
                                    select
                                    fullWidth
                                    defaultValue=""
                                    disabled={typesLoading || typesError}
                                    {...register("requestType", {
                                        required: "חובה לבחור סוג פנייה"
                                    })}
                                    error={typesError || !!errors.requestType}
                                    helperText={
                                        typesLoading ? "טוען סוגי פניות..."
                                            : typesError ? "לא הצלחנו לטעון את סוגי הפניות"
                                                : errors.requestType?.message
                                    }
                                >
                                    {requestTypes?.map((type: string) => (
                                        <MenuItem key={type} value={type}>
                                            {type}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    label="תיאור הפנייה"
                                    required
                                    multiline
                                    rows={4}
                                    fullWidth
                                    {...register("description", {
                                        required: "חובה להכניס תיאור"
                                    })}
                                    error={!!errors.description}
                                    helperText={errors.description?.message}
                                />

                                <TextField
                                    label="תאריך יעד"
                                    type="date"
                                    required
                                    fullWidth
                                    slotProps={{
                                        inputLabel: { shrink: true },
                                        htmlInput: { min: today }
                                    }}
                                    {...register("dueDate", {
                                        required: "חובה לבחור תאריך יעד",
                                        validate: (value) => value >= today || "תאריך היעד לא יכול להיות בעבר"
                                    })}
                                    error={!!errors.dueDate}
                                    helperText={errors.dueDate?.message}
                                />

                                {isError && <Alert severity="error">{error.message}</Alert>}

                                <Stack direction="row" spacing={1.5} sx={{ justifyContent: "flex-end", pt: 1 }}>
                                    <Button
                                        onClick={onCancel}
                                        disabled={isPending}
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
                                        disabled={isPending}
                                        variant="contained"
                                        sx={{
                                            borderRadius: 2.5,
                                            fontWeight: 600,
                                            px: 4,
                                            boxShadow: "none",
                                            background: "linear-gradient(to left, #4dd0e1, #ba68c8)",
                                            "&:hover": { boxShadow: "0 4px 14px rgba(186,104,200,0.35)" },
                                        }}
                                    >
                                        {isPending ? "שולח..." : "שליחת פנייה"}
                                    </Button>
                                </Stack>
                            </Stack>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    )
}

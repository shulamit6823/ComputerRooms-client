import { Alert, Box, TextField, Typography } from "@mui/material";
import useAddResponsible from "../hooks/UseAddResponsible";
import { useForm } from "react-hook-form";
import type { NewResponsible } from "../types/addRegister";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
type AddResponsibleProps = {
    onCancel: () => void;
}



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
        <Box>
            {
                showmessage ? (
                <>
                <Alert severity="success">
                    האחראית נוספה בהצלחה.
                    <br />
                    הסיסמה הזמנית שלה היא: <strong>12345678</strong>
                    <br />
                    יש להעביר את הסיסמה לאחראית.
                </Alert>
            <Button onClick={onCancel}>
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
                <Stack spacing={2}>
                    <TextField
                        label="הכנס את שם האחראית"
                        required
                        id="outlined-required"
                        {...register("name",
                            {
                                required: "חובה להכניס שם אחראית"
                            }
                        )}

                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                    <TextField
                        label="הכנס את המייל של האחראית"
                        required
                        type="email"
                        id="outlined-required"
                        {...register("email", {
                            required: "חובה להכניס מייל של אחראית",

                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />

                    <Stack direction="row" spacing={10} sx={{ gap: "10px" }}>
                        <Button onClick={onCancel} variant="outlined" startIcon={<DeleteIcon />} >
                            ביטול
                        </Button>

                        <Button type="submit" variant="contained" endIcon={<SendIcon />} disabled={isPending}>
                            לשלוח
                        </Button>
                    </Stack>

                </Stack>
                {isPending && <Typography>מפעיל...</Typography>}
                {isError && <Typography color="error">{error.message}</Typography>}
            </Box >
            )
            }
        </Box>

    )
}

export default AddResponsible



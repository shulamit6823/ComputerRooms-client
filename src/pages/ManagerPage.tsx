import { useQuery } from "@tanstack/react-query";
import getResponsibles from "../api/responsibleApi";
import {  Box, Button, Card, CardContent, Typography } from "@mui/material";
import { Usedeleteresponsible } from "../hooks/UseDeleteResponsible";
import { useState } from "react";
import AddResponsible from "../components/addResponsible";

const ManagerPage = () => {
    const { mutate, isPending: deleting } = Usedeleteresponsible();
    const [ShowForm, setShowForm] = useState(false);
    const { data, isLoading, isError } = useQuery({
        queryKey: ["responsible"],
        queryFn: getResponsibles
    });
    if (isLoading)
        return <p>טוען...</p>;

    if (isError)
        return <p>אירעה שגיאה בטעינת האחראיות</p>;

    if (!data)
        return <p>אין נתונים</p>;

    const handleDelete = (id: number) => {
        const confirm = window.confirm(
            "האם אתה בטוח שברצונך להסיר את האחראית?"
        );
        if (!confirm) return;
        mutate(id);
    }


    return (
        <Box
            sx={{
                padding: 4,
                minHeight: "100vh",
                background: "linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)",
            }}
        >
            <Typography
                variant="h4"
                sx={{ color: "#1e5aa8", fontWeight: "bold", marginBottom: 3 }}
            >
                ניהול אחראיות
            </Typography>

            <Button onClick={() => setShowForm(true)}>
                הוספת אחראית
            </Button>

            {ShowForm &&
                <Box sx={{ mb: 4 }}> <AddResponsible
                    onCancel={() => setShowForm(false)}
                    ></AddResponsible>
                </Box>
            }
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    maxWidth: 500,
                }}
            >
                {data.map((responsible) => (
                    <Card
                        key={responsible.id}
                        sx={{
                            borderRadius: 3,
                            boxShadow: 1,
                            borderInlineStart: "5px solid #1e5aa8",
                            transition: "0.2s",
                            "&:hover": {
                                boxShadow: 3,
                                transform: "translateY(-1px)",
                            },
                        }}
                    >
                        <CardContent>
                            <Typography variant="h6" sx={{ color: "#1e5aa8" }}>
                                {responsible.name}
                            </Typography>

                            <Typography color="text.secondary">
                                {responsible.email}
                            </Typography>
                            <Button onClick={() => handleDelete(responsible.id)} disabled={deleting}>להסרה</Button>


                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box >
    );
}


export default ManagerPage
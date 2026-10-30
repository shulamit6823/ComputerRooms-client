import { useQuery } from "@tanstack/react-query";
import getResponsibles from "../api/responsiblesApi";
import { Alert, Box, Button, Chip, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { Usedeleteresponsible } from "../hooks/UseDeleteResponsible";
import { useState } from "react";
import AddResponsible from "../components/AddResponsible";

// עיצוב משותף לתאי הטבלה
const headCellSx = { fontWeight: 700, color: "#5f6b7a", fontSize: 14, bgcolor: "#f6f3fa", borderBottom: "1px solid #e3e7ed", py: 1.75 };
const bodyCellSx = { fontSize: 15, color: "#1f2340", borderBottom: "1px solid #eef0f4", py: 1.5 };

const ManagerPage = () => {
    const { mutate, isPending: deleting,isError: isErrordelete,error:errordelete} = Usedeleteresponsible();
    const [ShowForm, setShowForm] = useState(false);
    const { data, isLoading,error,isError } = useQuery({
        queryKey: ["responsible"],
        queryFn: getResponsibles
    });
    if (isLoading)
        return (
            <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center", py: 10 }}>
                <CircularProgress size={44} thickness={4.5} sx={{ color: "#ba68c8" }} />
            </Box>
        );
    if(isError)
        return (
            <Box sx={{ px: { xs: 2, md: 4 }, pt: { xs: 3, md: 5 } }}>
                <Alert severity="error" sx={{ maxWidth: 520, mx: "auto" }}>{error.message}</Alert>
            </Box>
        )

    if (!data)
        return (
            <Box sx={{ px: { xs: 2, md: 4 }, pt: { xs: 3, md: 5 } }}>
                <Alert severity="info" sx={{ maxWidth: 520, mx: "auto" }}>אין נתונים</Alert>
            </Box>
        );

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
                flexGrow: 1,
                px: { xs: 2, md: 4 },
                pt: { xs: 3, md: 5 },
                pb: 5,
                background: "radial-gradient(circle at 100% 0%, #f3e5f5 0%, transparent 35%), radial-gradient(circle at 0% 100%, #e0f7fa 0%, transparent 35%), #fafbfd",
            }}
        >
            <Box sx={{ maxWidth: 1000, mx: "auto" }}>
                {/* כותרת + כפתור הוספה */}
                <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 2, mb: 3 }}>
                    <Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <Typography variant="h4" component="h1" sx={{ fontWeight: 800, color: "#1f2340" }}>
                                ניהול אחראיות
                            </Typography>
                            <Chip
                                label={data.length}
                                size="small"
                                sx={{ fontWeight: 700, bgcolor: "#f3e5f5", color: "#9b4dbf", height: 24 }}
                            />
                        </Box>
                        <Box sx={{ mt: 1, width: 72, height: 4, borderRadius: 2, background: "linear-gradient(to left, #4dd0e1, #ba68c8)" }} />
                    </Box>

                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<PersonAddAlt1RoundedIcon />}
                        onClick={() => setShowForm(true)}
                        sx={{
                            borderRadius: 3,
                            px: 3,
                            py: 1.25,
                            fontWeight: 700,
                            fontSize: 16,
                            boxShadow: "0 6px 18px rgba(186, 104, 200, 0.35)",
                            background: "linear-gradient(to left, #4dd0e1, #ba68c8)",
                            transition: "transform 0.15s, box-shadow 0.15s",
                            "& .MuiButton-startIcon": { marginInlineStart: 0, marginInlineEnd: 1 },
                            "&:hover": { transform: "translateY(-2px)", boxShadow: "0 10px 24px rgba(186, 104, 200, 0.45)" },
                        }}
                    >
                        הוספת אחראית
                    </Button>
                </Box>

                {ShowForm &&
                    <Box sx={{ mb: 3 }}> <AddResponsible
                        onCancel={() => setShowForm(false)}
                        ></AddResponsible>
                    </Box>
                }

                {isErrordelete && <Alert severity="error" sx={{ mb: 2 }}>{errordelete.message}</Alert>}

                {/* טבלת האחראיות */}
                <TableContainer
                    component={Paper}
                    variant="outlined"
                    sx={{
                        borderRadius: 4,
                        borderColor: "#e3e7ed",
                        boxShadow: "0 4px 20px rgba(31, 35, 64, 0.06)",
                        overflow: "hidden",
                    }}
                >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ ...headCellSx, width: 70 }}>#</TableCell>
                                <TableCell sx={headCellSx}>שם</TableCell>
                                <TableCell sx={headCellSx}>אימייל</TableCell>
                                <TableCell sx={headCellSx}>תפקיד</TableCell>
                                <TableCell sx={{ ...headCellSx, width: 120 }} />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} sx={{ ...bodyCellSx, textAlign: "center", color: "text.secondary", py: 5 }}>
                                        עדיין אין אחראיות במערכת
                                    </TableCell>
                                </TableRow>
                            )}
                            {data.map((responsible) => (
                                <TableRow
                                    key={responsible.id}
                                    sx={{
                                        transition: "background-color 0.15s",
                                        "&:hover": { bgcolor: "#fbf6fe" },
                                        "&:last-child td": { borderBottom: 0 },
                                    }}
                                >
                                    <TableCell sx={{ ...bodyCellSx, color: "#9aa5b4", fontWeight: 600 }}>{responsible.id}</TableCell>
                                    <TableCell sx={{ ...bodyCellSx, fontWeight: 600 }}>{responsible.name}</TableCell>
                                    <TableCell sx={{ ...bodyCellSx, color: "#5f6b7a" }}>{responsible.email}</TableCell>
                                    <TableCell sx={bodyCellSx}>
                                        <Chip
                                            label="אחראית"
                                            size="small"
                                            sx={{ fontWeight: 700, bgcolor: "#e0f7fa", color: "#00838f", borderRadius: 2 }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ ...bodyCellSx, textAlign: "left" }}>
                                        <Button
                                            onClick={() => handleDelete(responsible.id)}
                                            disabled={deleting}
                                            size="small"
                                            color="error"
                                            startIcon={<DeleteOutlineRoundedIcon />}
                                            sx={{ fontWeight: 700, borderRadius: 2, "& .MuiButton-startIcon": { marginInlineStart: 0, marginInlineEnd: 0.5 } }}
                                        >
                                            להסרה
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box >
    );
}


export default ManagerPage

import { Alert, Box, Button, Card, Chip, CircularProgress, Divider, MenuItem, TextField, Typography } from "@mui/material"
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { useNavigate, useParams } from "react-router"
import { UseChangeRequestType, UseOneRequestForRes } from "../hooks/UseRequestDetails"
import { useContext, useEffect, useState } from "react";
import { UseRequestTypes } from "../hooks/UseRequestTypes";
import MessagesInRequest from "../components/MessagesInRequest";
import { ChangeStatus } from "../components/ChangeStatus";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { UserContext } from "../context/UserContext";
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutlined';
import statusConfig from "../components/statusConfig";



const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 4, mb: 1.5, maxWidth: 560 }}>
        <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#8a94a6', whiteSpace: 'nowrap' }}>
            {children}
        </Typography>
        <Box sx={{ flex: 1, height: '1px', background: 'linear-gradient(to left, #e3e7ed, transparent)' }} />
    </Box>
);


const RequestDetailsPage = () => {
    const { id } = useParams();
    const { data, isError, error, isPending } = UseOneRequestForRes();
    const navigate = useNavigate()
    const context = useContext(UserContext);
    if (!context)
        throw new Error("UserContext לא נמצא");

    const { user } = context
    const isResponsible = user?.role === "Responsible";
    const basePath = isResponsible ? "/responsible/requests" : "/teacher/requests";


    const [selectedType, setSelectedType] = useState("");
    useEffect(() => {
        if (data)
            setSelectedType(data.requestType)
    }, [data])
    const { data: requestTypes,isError:isErrorRequestType,error:errorRequestType } = UseRequestTypes();
    const { mutate: changeType, isPending: typeChanging,isError:isErrorChangeRequestType,error:errorChangeRequestType } = UseChangeRequestType();

    if (isPending) {
        return (
            <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center", py: 10 }}>
                <CircularProgress size={44} thickness={4.5} />
            </Box>
        )
    }
    if (isError ) {
        return (
            <Box sx={{ px: { xs: 2, md: 4 }, pt: { xs: 3, md: 5 } }}>
                <Alert severity="error" sx={{ maxWidth: 520, mx: "auto" }}>{error.message}</Alert>
            </Box>
        )
    }



    const s = statusConfig[data!.status];

    return (
        <Box sx={{ flexGrow: 1, px: { xs: 2, md: 4 }, pt: { xs: 3, md: 5 }, pb: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Button
                    onClick={() => navigate(basePath)}
                    startIcon={<ArrowForwardIcon />}
                    sx={{
                        color: '#5f6b7a',
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: 14,
                        borderRadius: 2,
                        px: 1.5,
                        mb: 2,
                        '&:hover': { bgcolor: '#f3f5f8' },
                    }}
                >
                    חזרה לרשימת הפניות
                </Button>

                <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    פנייה #{id}
                </Typography>
                <Box sx={{ mt: 1.5, display: 'flex', gap: 0.75 }}>
                    {['#4dd0e1', '#9fa8da', '#ba68c8'].map(c => (
                        <Box key={c} sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: c }} />
                    ))}

                </Box>

                <Divider sx={{ my: 3, color: 'text.secondary', fontSize: 20 }}></Divider>

                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                    {data?.roomName}
                </Typography>
                <Typography variant="h6" component="div">
                    מחשב: {data?.computerNumber}
                </Typography>
                {isResponsible ? (
                    <Box sx={{ mb: 2, mt: 1 }}>
                        <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1.5 }}>
                            <TextField
                                select
                                size="small"
                                label="סוג הפנייה"
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                sx={{
                                    minWidth: 200,
                                    "& .MuiOutlinedInput-root": { borderRadius: 2.5, bgcolor: "#ffffff" },
                                }}
                            >
                                {requestTypes?.map((t: string) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                            </TextField>
                            <Button
                                onClick={() => changeType(selectedType)}
                                disabled={typeChanging}
                                variant="outlined"
                                startIcon={typeChanging ? <CircularProgress size={16} /> : <CheckRoundedIcon />}
                                sx={{
                                    borderRadius: 2.5,
                                    fontWeight: 700,
                                    color: "#9b4dbf",
                                    borderColor: "#e2c4f2",
                                    "& .MuiButton-startIcon": { marginInlineStart: 0, marginInlineEnd: 0.75 },
                                    "&:hover": { borderColor: "#d77cf5", bgcolor: "#fbf4fe" },
                                }}
                            >
                                אישור שינוי
                            </Button>
                        </Box>
                        {isErrorChangeRequestType && <Alert severity="error" sx={{ mt: 1.5, maxWidth: 520 }}>{errorChangeRequestType.message}</Alert>}
                    </Box>
                ) : (
                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                        סוג הפנייה:{" "}
                        <Chip
                            label={data!.requestType}
                            size="small"
                            variant="outlined"
                            sx={{ fontWeight: 600, color: "#7b3f99", borderColor: "#e2c4f2", bgcolor: "#fbf6fe" }}
                        />
                    </Typography>
                )}

                <Typography sx={{
                    color: 'text.primary',
                    fontSize: '1.1rem',
                    fontWeight: 550,
                    mb: 1.5
                }}>{data!.description}</Typography>
                <Card
                    variant="outlined"
                    sx={{
                        maxWidth: 560,
                        mb: 3,
                        px: 2.5,
                        py: 1.5,
                        borderRadius: 3,
                        borderColor: '#e3e7ed',
                        bgcolor: '#fafbfc',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 2,
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography sx={{ fontSize: 13, color: '#8a94a6' }}>סטטוס:</Typography>
                        <Chip
                            size="small"
                            label={s?.label ?? data?.status}
                            sx={{ bgcolor: s?.bg, color: s?.fg, fontWeight: 600, fontSize: 12, borderRadius: 1.5 }}
                        />
                    </Box>

                    {user?.role === "Responsible" &&

                        < ChangeStatus status={data!.status} currentResponsibleName={data!.currentResponsibleName}
                        ></ChangeStatus>

                    }
                </Card>

                <Typography variant="body2">
                    תאריך יעד: {new Date(data!.dueDate).toLocaleDateString("he-IL")}
                </Typography>
                <Typography variant="body2">
                    התקבלה: {new Date(data!.createdAt).toLocaleString("he-IL")}
                </Typography>

                {data!.currentResponsibleName && (
                    <Typography variant="body2">
                        בטיפול האחראית: {data!.currentResponsibleName}
                    </Typography>
                )}

                {isResponsible && (
                <>
                <SectionTitle>פרטי מורה</SectionTitle>

                <Card
                    variant="outlined"
                    sx={{
                        maxWidth: 560,
                        px: 2.5,
                        py: 2,
                        borderRadius: 3,
                        borderColor: '#e3e7ed',
                        bgcolor: '#fafbfc',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1.25,
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                        <PersonOutlineIcon sx={{ fontSize: 18, color: '#9aa5b4' }} />
                        <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#3d4654' }}>
                            {data!.teacherName}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                        <MailOutlineIcon sx={{ fontSize: 18, color: '#9aa5b4' }} />
                        <Typography
                            component="a"
                            href={`mailto:${data!.teacherEmail}`}
                            sx={{ fontSize: 14, color: '#5f6b7a', textDecoration: 'none', '&:hover': { color: '#00838f' } }}
                        >
                            {data!.teacherEmail}
                        </Typography>
                    </Box>
                </Card>
                </>
                )}

                <SectionTitle>תיאור והודעות</SectionTitle>

                <MessagesInRequest data={data}></MessagesInRequest>

            </Box>
             {isErrorRequestType && <Typography color="error">{errorRequestType.message}</Typography >}
        </Box >
    )
}
export default RequestDetailsPage
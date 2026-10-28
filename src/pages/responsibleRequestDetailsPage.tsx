import { Box, Button, Card, Chip, Divider, Typography } from "@mui/material"
import { useNavigate, useParams } from "react-router"
import { UseOneRequestForRes } from "../hooks/UseRequestForRes"
import { useContext, useEffect, useState } from "react";
import { ChangeRequestTypeApi } from "../api/RequestForResApi";
import { UseRequestTypes } from "../hooks/useRequestTYpes";
import MessagesInRequest from "../components/messagesInRequest";
import { ChangeStatus } from "../components/ChangeStatus";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { UserContext } from "../context/UserContext";
import type { RequestStatus } from "../types/RequestStatus";
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutlined';

const statusConfig: Record<RequestStatus, { label: string; bg: string; fg: string }> = {
    Pending: { label: 'ממתינה לטיפול', bg: '#fdecea', fg: '#c62828' },
    InProgress: { label: 'בטיפול', bg: '#fff3e0', fg: '#e65100' },
    Finished: { label: 'הסתיימה', bg: '#e8f5e9', fg: '#2e7d32' },
};
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 4, mb: 1.5, maxWidth: 560 }}>
        <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#8a94a6', whiteSpace: 'nowrap' }}>
            {children}
        </Typography>
        <Box sx={{ flex: 1, height: '1px', background: 'linear-gradient(to left, #e3e7ed, transparent)' }} />
    </Box>
);


const ResponsibleRequestDetails = () => {
    const { id } = useParams();
    const { data, isError, error, isPending } = UseOneRequestForRes();
    const navigate = useNavigate()
    const context = useContext(UserContext);
    if (!context)
        throw new Error("UserContext לא נמצא");

    const { user } = context


    const [selectedType, setSelectedType] = useState("");
    useEffect(() => {
        if (data)
            setSelectedType(data.requestType)
    }, [data])
    const { data: requestTypes } = UseRequestTypes();

    console.log("REQUEST TYPES:", requestTypes);

    if (isPending) {
        return <p>טוען...</p>
    }
    if (isError) {
        return <p>{error.message}</p>
    }


    const s = statusConfig[data!.status];

    return (
        <Box sx={{ flexGrow: 1, px: { xs: 2, md: 4 }, pt: { xs: 3, md: 5 }, pb: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Button
                    onClick={() => navigate(`/responsible/requests`)}
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
                <Typography sx={{ color: 'text.secondary', mb: 1.5 }} >סוג הפנייה:
                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        style={{
                            marginRight: "10px",
                            padding: "8px 12px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                            backgroundColor: "#fff",
                            fontSize: "16px",
                            minWidth: "160px",
                            cursor: "pointer",
                            outline: "none"
                        }}
                    >
                        {requestTypes?.map((t: string) => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <Button onClick={() => ChangeRequestTypeApi(id!, selectedType)}>אישור שינוי</Button>
                </Typography>

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

                <Typography variant="body2">
                    בטיפול האחראית: {data!.currentResponsibleName}
                    <br />
                </Typography>

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

                <SectionTitle>תיאור והודעות</SectionTitle>

                <MessagesInRequest data={data}></MessagesInRequest>

            </Box>
        </Box >
    )
}
export default ResponsibleRequestDetails
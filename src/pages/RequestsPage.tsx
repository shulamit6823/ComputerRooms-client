import UseGetRequest from "../hooks/UseGetRequest"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import { useNavigate } from "react-router";
import type { RequestStatus } from "../types/RequestStatus";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import RequestFilters from "../components/RequestFilters";
import statusConfig from "../components/statusConfig";


const statusMap: Record<string, string> = {
    "ממתינה לטיפול": "Pending",
    "בטיפול": "InProgress",
    "הסתיימה": "Finished"
};

const PageLoader = () => (
    <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center", py: 10 }}>
        <CircularProgress size={44} thickness={4.5} sx={{ color: "#ba68c8" }} />
    </Box>
);

// שורת מידע בכרטיס: אייקון + טקסט
const InfoRow = ({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "#5f6b7a", fontSize: 13.5 }}>
        <Box sx={{ display: "flex", color: "#9aa5b4", "& svg": { fontSize: 18 } }}>{icon}</Box>
        <Typography component="span" sx={{ fontSize: 13.5, color: "inherit" }}>{children}</Typography>
    </Box>
);

const RequestsPage = () => {
    const navigate = useNavigate()
    const { data, isPending, isError } = UseGetRequest()
    const [chooseFilter, setChooseFilter] = useState("");
    const [filterValue, setFilterValue] = useState("");
    const [chooseSort, setChooseSort] = useState("");

    const context = useContext(UserContext);
    if (!context)
        throw new Error("UserContext לא נמצא");


    const { user } = context
    const basePath = user?.role === "Teacher" ? "/teacher/requests" : "/responsible/requests";

    const handleFilter = (type: string, value: string) => {
        setFilterValue(value)
        setChooseFilter(type)
    }

    const handleSort = (value: string) => {
        setChooseSort(value)
    };


    if (isPending)
        return <PageLoader />
    if (isError)
        return (
            <Box sx={{ px: { xs: 2, md: 4 }, pt: { xs: 3, md: 5 } }}>
                <Alert severity="error" sx={{ maxWidth: 520, mx: "auto" }}>
                    אירעה שגיאה בטעינת הפניות
                </Alert>
            </Box>
        )

    const filteredData = data!.filter((f) => {
        if (chooseFilter === "סטטוס") {
            return f.status === statusMap[filterValue]
        }
        if (chooseFilter == "סוג פנייה") {
            return f.requestType === filterValue
        }
        return true;
    })

    const sortedData = [...filteredData].sort((a, b) => {
        if (chooseSort === "תאריך יצירה") {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }

        if (chooseSort === "תאריך יעד") {
            return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        }

        return 0;
    });
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
            <Box sx={{ maxWidth: 1200, mx: "auto" }}>
                {/* כותרת הדף + כפתור הוספה */}
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "flex-end",
                        justifyContent: "space-between",
                        gap: 2,
                        mb: 3,
                    }}
                >
                    <Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <Typography variant="h4" component="h1" sx={{ fontWeight: 800, color: '#1f2340' }}>
                                {user?.role === "Responsible" ? "כל הפניות" : "הפניות שלי"}
                            </Typography>
                            <Chip
                                label={data!.length}
                                size="small"
                                sx={{ fontWeight: 700, bgcolor: "#f3e5f5", color: "#9b4dbf", height: 24 }}
                            />
                        </Box>
                        <Typography sx={{ color: 'text.secondary', mt: 0.5 }}>
                            {user?.role === "Responsible"
                                ? "צפייה וסינון של כל הפניות במערכת"
                                : "צפייה בפניות שפתחת ומעקב אחרי הטיפול בהן"}
                        </Typography>
                        <Box sx={{ mt: 1.5, display: 'flex', gap: 0.75 }}>
                            {['#4dd0e1', '#9fa8da', '#ba68c8'].map(c => (
                                <Box key={c} sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: c }} />
                            ))}
                        </Box>
                    </Box>

                    {user?.role === "Teacher" && (
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<AddRoundedIcon />}
                            onClick={() => navigate("/teacher/requests/create")}
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
                                "&:hover": {
                                    transform: "translateY(-2px)",
                                    boxShadow: "0 10px 24px rgba(186, 104, 200, 0.45)",
                                },
                            }}
                        >
                            פנייה חדשה
                        </Button>
                    )}
                </Box>

                <RequestFilters
                    onFilter={handleFilter}
                    onSort={handleSort}
                    disabled={data?.length === 0}
                />

                {sortedData.length === 0 ? (
                    <Card
                        variant="outlined"
                        sx={{
                            maxWidth: 520,
                            mx: "auto",
                            mt: 4,
                            textAlign: "center",
                            borderRadius: 4,
                            border: "1px dashed #d0d7e2",
                            bgcolor: "#ffffff",
                        }}
                    >
                        <CardContent sx={{ py: 5 }}>
                            <Box
                                sx={{
                                    width: 64,
                                    height: 64,
                                    mx: "auto",
                                    mb: 2,
                                    borderRadius: "50%",
                                    bgcolor: "#f3e5f5",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <InboxOutlinedIcon sx={{ fontSize: 32, color: "#ba68c8" }} />
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                                אין כרגע פניות
                            </Typography>
                            <Typography color="text.secondary">
                                כרגע אין פניות להצגה.
                            </Typography>
                        </CardContent>
                    </Card>
                ) : (
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {sortedData.map(request => {
                            const st = statusConfig[request.status as RequestStatus];
                            return (
                                <Grid key={request.id} size={{ xs: 4, sm: 4, md: 4 }}>
                                    <Card
                                        variant="outlined"
                                        sx={{
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            borderRadius: 4,
                                            border: "1px solid #e3e7ed",
                                            bgcolor: "#ffffff",
                                            boxShadow: "0 2px 10px rgba(31, 35, 64, 0.05)",
                                            overflow: "hidden",
                                            transition: "transform 0.2s, box-shadow 0.2s",
                                            "&:hover": {
                                                transform: "translateY(-3px)",
                                                boxShadow: "0 10px 26px rgba(31, 35, 64, 0.10)",
                                            },
                                        }}
                                    >
                                        <Box sx={{ height: 4, bgcolor: st?.fg ?? "#cfd8dc", opacity: 0.85 }} />

                                        <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                                                <Typography sx={{ color: '#9aa5b4', fontSize: 13, fontWeight: 700 }}>
                                                    #{request.id}
                                                </Typography>
                                                <Chip
                                                    size="small"
                                                    label={st?.label ?? request.status}
                                                    sx={{
                                                        bgcolor: st?.bg ?? '#eceff1',
                                                        color: st?.fg ?? '#546e7a',
                                                        fontWeight: 700,
                                                        fontSize: 11.5,
                                                        borderRadius: 1.5,
                                                        height: 24,
                                                    }}
                                                />
                                            </Box>

                                            <Typography
                                                sx={{
                                                    color: '#1f2340',
                                                    fontSize: '1.05rem',
                                                    fontWeight: 700,
                                                    lineHeight: 1.45,
                                                    mb: 1.5,
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 3,
                                                    WebkitBoxOrient: "vertical",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                {request.description}
                                            </Typography>

                                            <Chip
                                                label={request.requestType}
                                                size="small"
                                                variant="outlined"
                                                sx={{ mb: 2, fontWeight: 600, color: "#7b3f99", borderColor: "#e2c4f2", bgcolor: "#fbf6fe" }}
                                            />

                                            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
                                                <InfoRow icon={<MeetingRoomOutlinedIcon />}>{request.roomName}</InfoRow>
                                                <InfoRow icon={<ComputerOutlinedIcon />}>מחשב: {request.computerNumber || "—"}</InfoRow>
                                                <InfoRow icon={<EventOutlinedIcon />}>
                                                    תאריך יעד: {new Date(request.dueDate).toLocaleDateString("he-IL")}
                                                </InfoRow>
                                                <InfoRow icon={<ScheduleOutlinedIcon />}>
                                                    התקבלה: {new Date(request.createdAt).toLocaleString("he-IL")}
                                                </InfoRow>
                                                {request.currentResponsibleName && (
                                                    <InfoRow icon={<PersonOutlineIcon />}>
                                                        בטיפול האחראית: {request.currentResponsibleName}
                                                    </InfoRow>
                                                )}
                                            </Box>
                                        </CardContent>

                                        <Divider sx={{ borderColor: "#eef0f4" }} />
                                        <CardActions sx={{ px: 2, py: 1 }}>
                                            <Button
                                                onClick={() =>
                                                    navigate(`${basePath}/${request.id}`)
                                                }
                                                size="small"
                                                endIcon={<ChevronLeftIcon />}
                                                sx={{ fontWeight: 700, color: "#9b4dbf", borderRadius: 2, "&:hover": { bgcolor: "#fbf4fe" } }}
                                            >
                                                לפרטים נוספים
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                )}
            </Box>
        </Box>
    );
}

export default RequestsPage

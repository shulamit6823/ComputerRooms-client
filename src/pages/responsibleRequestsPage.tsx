import UseGetRequest from "../hooks/UseGetRequest"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useNavigate } from "react-router";
import type { RequestStatus } from "../types/RequestStatus";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import RequestFilters from "../components/filte_sort";

const statusConfig: Record<RequestStatus, { label: string; bg: string; fg: string }> = {
    Pending: { label: 'ממתינה לטיפול', bg: '#fdecea', fg: '#c62828' },
    InProgress: { label: 'בטיפול', bg: '#fff3e0', fg: '#e65100' },
    Finished: { label: 'הסתיימה', bg: '#e8f5e9', fg: '#2e7d32' },
};
const statusMap: Record<string, string> = {
    "ממתינה לטיפול": "Pending",
    "בטיפול": "InProgress",
    "הסתיימה": "Finished"
};
const sortMap = {
    "ללא מיון": "",
    "תאריך יצירה": "createdAt",
    "תאריך יעד": "dueDate"
};

const ResponsibleRequests = () => {
    const navigate = useNavigate()
    const { data, isPending, isError } = UseGetRequest()
    const [chooseFilter, setChooseFilter] = useState("");
    const [filterValue, setFilterValue] = useState("");
    const [chooseSort, setChooseSort] = useState("");

    const context = useContext(UserContext);
    if (!context)
        throw new Error("UserContext לא נמצא");


    const { user } = context

    const handleFilter = (type: string, value: string) => {
        setFilterValue(value)
        setChooseFilter(type)
    }

    const handleSort = (value: string) => {
        setChooseSort(value)
    };


    if (isPending)
        return <p>טוען...</p>
    if (isError)
        return <p>אירעה שגיאה בטעינת הפניות</p>

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
        <Box sx={{ flexGrow: 1, px: { xs: 2, md: 4 }, pt: { xs: 3, md: 5 }, pb: 4 }}>
            <Box sx={{ mb: 4 }}>
                {user?.role === "Responsible" ? (
                    <><Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: 'text.primary' }}>
                        כל הפניות
                    </Typography>
                        <Typography sx={{ color: 'text.secondary', mt: 0.5 }}>
                            צפייה וסינון של כל הפניות במערכת
                        </Typography></>
                ) : (

                    <><Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: 'text.primary' }}>
                        הפניות שלי
                    </Typography>
                        <Typography sx={{ color: 'text.secondary', mt: 0.5 }}>
                            צפייה בפניות שפתחת
                        </Typography></>)
                }

                <Box sx={{ mt: 1.5, display: 'flex', gap: 0.75 }}>
                    {['#4dd0e1', '#9fa8da', '#ba68c8'].map(c => (
                        <Box key={c} sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: c }} />
                    ))}
                </Box>

            </Box>

            <RequestFilters
                requests={data ?? []}
                onFilter={handleFilter}
                onSort={handleSort}
            />

            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 16 }}>

                {sortedData.map(request => (
                    <Grid key={request.id} size={{ xs: 2, sm: 4, md: 4 }}>
                        <Card
                            variant="outlined"
                            sx={{
                                height: "100%",
                                borderRadius: 3,
                                border: "1px solid #d0d7e2",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                                transition: "0.2s",
                                backgroundColor: "#f5f5f5",
                                "&:hover": { boxShadow: "0 4px 14px rgba(0,0,0,0.1)" },
                            }}
                        >

                            <Box
                                sx={{
                                    height: 4,
                                    background: "linear-gradient(to left, #4dd0e1, #ba68c8)",
                                }}
                            />
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                    <Typography sx={{ color: 'text.secondary', fontSize: 10 }}>
                                        #פנייה {request.id}
                                    </Typography>
                                    <Chip
                                        size="small"
                                        label={statusConfig[request.status as RequestStatus]?.label ?? request.status}
                                        sx={{
                                            bgcolor: statusConfig[request.status as RequestStatus]?.bg ?? '#eceff1',
                                            color: statusConfig[request.status as RequestStatus]?.fg ?? '#546e7a',
                                            fontWeight: 600,
                                            fontSize: 11,
                                            borderRadius: 1.5,
                                            height: 22,
                                            border: '1px solid',
                                            borderColor: statusConfig[request.status as RequestStatus]?.fg ?? '#cfd8dc',
                                        }}
                                    />
                                </Box>
                                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                    {request.roomName}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    מחשב: {request.computerNumber}
                                </Typography>
                                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>סוג הפנייה: {request.requestType}</Typography>

                                <Typography sx={{
                                    color: 'text.primary',
                                    fontSize: '1.1rem',
                                    fontWeight: 550,
                                    mb: 1.5
                                }}>{request.description}</Typography>

                                <Typography variant="body2">
                                    תאריך יעד: {new Date(request.dueDate).toLocaleDateString("he-IL")}
                                </Typography>
                                <Typography variant="body2">
                                    התקבלה: {new Date(request.createdAt).toLocaleString("he-IL")}
                                </Typography>
                                <Typography variant="body2">
                                    בטיפול האחראית: {request.currentResponsibleName}
                                    <br />
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={() =>
                                    navigate(`/responsible/requests/${request.id}`)
                                } size="small" endIcon={<ChevronLeftIcon />} >לפרטים נוספים</Button>
                            </CardActions>
                        </Card>

                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default ResponsibleRequests

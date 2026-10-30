import { Alert, Box, Button, CircularProgress, FormControlLabel, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material"
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import type { messageType } from "../types/messageType";
import { useContext, useState } from "react";
import type { RequestDetails } from "../types/RequestDetails";
import { UseAddMessageRespon, UseAddMessageTeacher } from "../hooks/UseAddMessages";
import { UserContext } from "../context/UserContext";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

type Props = {
    data: RequestDetails | undefined;
};
const messageStyles = {
    teacher: { bg: '#ffffff', border: '1px solid #e3e7ed', accent: '#5f6b7a', align: 'flex-start' },
    toTeacher: { bg: '#e8f6f8', border: '1px solid #c5e7ec', accent: '#00838f', align: 'flex-end' },
    internal: { bg: '#fff8e6', border: '1px dashed #f0c674', accent: '#a86b00', align: 'flex-end' },
};
const MessagesInRequest = ({ data }: Props) => {

    const [showMessage, setShowMessage] = useState(false);
    const [text, setText] = useState("");
    const [messageType, setMessageType] = useState<"Public" | "Internal">("Public")
    const { mutate: addPublicMessage, isError, isPending, error } = UseAddMessageTeacher();
    const { mutate: addInternalMessage, isPending: internalPending, isError: isErrorAddMessage, error: errorAddMessag } = UseAddMessageRespon();
    const context = useContext(UserContext);
    if (!context)
        throw new Error("UserContext לא נמצא");

    const { user } = context
    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, maxWidth: 720, mb: 3 }}>
                {data?.messages?.map((mess: messageType) => {
                    if (!(user?.role === "Responsible" || mess.visibility === "Public")) return null;

                    const kind =
                        mess.visibility === "Internal" ? 'internal'
                            : mess.authorRole === "Teacher" ? 'teacher'
                                : 'toTeacher';
                    const st = messageStyles[kind];
                    const isStart = st.align === 'flex-start';

                    return (
                        <Box
                            key={mess.id}
                            sx={{
                                alignSelf: st.align,
                                maxWidth: '75%',
                                minWidth: 220,
                                bgcolor: st.bg,
                                border: st.border,
                                borderRadius: 3,
                                [isStart ? 'borderStartStartRadius' : 'borderStartEndRadius']: 4,
                                px: 2,
                                py: 1.5,
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.5, flexWrap: 'wrap' }}>
                                {kind === 'internal' && <LockOutlinedIcon sx={{ fontSize: 14, color: st.accent }} />}
                                <Typography sx={{ fontSize: 13, fontWeight: 700, color: st.accent }}>
                                    {mess.authorName}
                                </Typography>
                                <Typography sx={{ fontSize: 12, color: '#8a94a6' }}>
                                    {mess.authorRole === "Teacher" ? 'מורה' : 'אחראית'}
                                    {' · '}
                                    {kind === 'internal'
                                        ? 'הודעה פנימית'
                                        : kind === 'teacher'
                                            ? 'לאחראיות'
                                            : `למורה ${data?.teacherName}`}
                                </Typography>
                            </Box>

                            <Typography sx={{ fontSize: 14, color: '#2f3742', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                                {mess.description}
                            </Typography>

                            <Typography sx={{ fontSize: 11, color: '#9aa5b4', mt: 1, textAlign: 'end' }}>
                                {new Date(mess.createdAt).toLocaleString("he-IL")}
                            </Typography>
                        </Box>
                    );
                })}
            </Box>

            <Button
                onClick={() => setShowMessage(true)}
                variant="outlined"
                startIcon={<AddCommentOutlinedIcon />}
                sx={{
                    borderRadius: 2.5,
                    fontWeight: 700,
                    px: 2.5,
                    color: "#9b4dbf",
                    borderColor: "#e2c4f2",
                    bgcolor: "#ffffff",
                    "& .MuiButton-startIcon": { marginInlineStart: 0, marginInlineEnd: 0.75 },
                    "&:hover": { borderColor: "#d77cf5", bgcolor: "#fbf4fe" },
                }}
            >
                הוספת הודעה
            </Button>

            {showMessage && (<Paper
                variant="outlined"
                sx={{
                    mt: 2,
                    p: 2.5,
                    maxWidth: 720,
                    borderRadius: 3,
                    borderColor: "#e3e7ed",
                    bgcolor: "#ffffff",
                    boxShadow: "0 4px 18px rgba(31, 35, 64, 0.06)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                }}
            >
                <TextField
                    label="תוכן ההודעה"
                    multiline
                    minRows={3}
                    maxRows={8}
                    fullWidth
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2.5 } }}
                />

                {user?.role === "Responsible" && (
                    <RadioGroup
                        row
                        value={messageType}
                        onChange={(e) => setMessageType(e.target.value as "Public" | "Internal")}
                        sx={{ "& .MuiRadio-root.Mui-checked": { color: "#9b4dbf" } }}
                    >
                        <FormControlLabel value="Public" control={<Radio />} label="הודעה למורה" />
                        <FormControlLabel value="Internal" control={<Radio />} label="הודעה פנימית" />
                    </RadioGroup>
                )}

                <Button
                    variant="contained"
                    endIcon={(isPending || internalPending) ? <CircularProgress size={18} sx={{ color: "#fff" }} /> : <SendRoundedIcon sx={{ transform: "scaleX(-1)" }} />}
                    sx={{
                        alignSelf: "flex-end",
                        borderRadius: 2.5,
                        fontWeight: 700,
                        px: 3,
                        boxShadow: "none",
                        background: "linear-gradient(to left, #4dd0e1, #ba68c8)",
                        "& .MuiButton-endIcon": { marginInlineEnd: 0, marginInlineStart: 1 },
                        "&:hover": { boxShadow: "0 4px 14px rgba(186,104,200,0.35)" },
                        "&.Mui-disabled": { color: "#fff", opacity: 0.6 },
                    }}
                    disabled={!text.trim() || isPending || internalPending} onClick={() =>
                    messageType == "Public" ? addPublicMessage(text, {
                        onSuccess: () => {
                            setShowMessage(false)
                            setText("")
                            setMessageType("Public")
                        }
                    }) : addInternalMessage(text, {
                        onSuccess: () => {
                            setShowMessage(false)
                            setText("")
                            setMessageType("Public")
                        }
                    })
                } >שליחה
                </Button>
            </Paper>
            )}
            {isError && <Alert severity="error" sx={{ mt: 1.5, maxWidth: 720 }}>{error.message}</Alert>}
            {isErrorAddMessage && <Alert severity="error" sx={{ mt: 1.5, maxWidth: 720 }}>{errorAddMessag.message}</Alert>}

        </>
    )
}

export default MessagesInRequest

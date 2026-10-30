import type { RequestStatus } from "../types/RequestStatus";
import { UseFinishRequest, UseTakeRequest } from "../hooks/UseRequestDetails";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Button, Typography } from "@mui/material";
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';

const buttonSx = {
    borderRadius: 2,
    textTransform: 'none',
    fontWeight: 600,
    fontSize: 13,
    px: 2,
};
type ChangeStatusProps = {
    status: RequestStatus
    currentResponsibleName: string | null;
}

export const ChangeStatus = ({ status, currentResponsibleName }: ChangeStatusProps) => {
    const { mutate: TakeRequest, isPending: taking, isError, error } = UseTakeRequest();
    const { mutate: FinishRequest, isPending: finishing, isError: finishFailed, error: finishError } = UseFinishRequest();
    const context = useContext(UserContext);

    if (!context)
        throw new Error("UserContext לא נמצא");
    const { user } = context;

    const Buttons = () => {
        const takeButton = (
            <Button
                variant="outlined"
                size="small"
                startIcon={<AssignmentIndOutlinedIcon />}
                onClick={() => TakeRequest()}
                disabled={taking}
                sx={{ ...buttonSx, color: '#5f6b7a', borderColor: '#d5dae2', '&:hover': { borderColor: '#9aa5b4', bgcolor: '#f5f7fa' } }}
            >
                להעביר לטיפולי
            </Button>
        );

        if (status === "Pending") return takeButton;

        if (status === "InProgress") {
            if (user?.name === currentResponsibleName) {
                return (
                    <Button
                        variant="contained"
                        size="small"
                        disableElevation
                        startIcon={<CheckCircleOutlineIcon />}
                        onClick={() => FinishRequest()}
                        disabled={finishing}
                        sx={{ ...buttonSx, bgcolor: '#2e7d32', '&:hover': { bgcolor: '#256b29' } }}
                    >
                        סיום פנייה
                    </Button>
                );
            }
            return takeButton;
        }
        return null;
    }



    return <>
        {finishFailed && <Typography color="error">{finishError.message}</Typography>}

        {isError && <Typography color="error">{error.message}</Typography >}
        {Buttons()}
    </>
}
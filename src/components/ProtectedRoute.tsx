import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { UserContext } from "../context/UserContext";
import { Box, CircularProgress } from "@mui/material";

type ProtectedRouteProps = {
    allowedRoles: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
    const context = useContext(UserContext);
    if (!context)
        throw new Error("UserContext לא נמצא");

    const { user, isLoading } = context;

    // 1. עוד בודקים מי מחוברת
    if (isLoading)
        return (
            <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center", py: 10 }}>
                <CircularProgress size={44} thickness={4.5} />
            </Box>
        );

    // 2. אף אחת לא מחוברת
    if (!user)
        return <Navigate to="/login" replace />;

    // 3. מחוברת, אבל אין לה הרשאה לדפים האלה
    if (!allowedRoles.includes(user.role)) {
        if (user.role === "Manager")
            return <Navigate to="/manager" replace />;
        if (user.role === "Teacher")
            return <Navigate to="/teacher/requests" replace />;
        return <Navigate to="/responsible/requests" replace />;
    }

    // הכול תקין - מציגים את הדף המבוקש
    return <Outlet />;
}

export default ProtectedRoute;

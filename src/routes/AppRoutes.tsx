import { createBrowserRouter, Navigate } from "react-router";
import RegisterPage from "../pages/RegisterPage"
import LoginPage from "../pages/LoginPage";
import App from "../App";
import ManagerPage from "../pages/ManagerPage";
import RequestsPage from "../pages/RequestsPage";
import ChangePassword from "../pages/ChangePassword";
import RequestDetailsPage from "../pages/RequestDetailsPage";
import { NewRequest } from "../components/NewRequest";
import ProtectedRoute from "../components/ProtectedRoute";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Navigate to="/login" replace />
            },
            {
                path: "register",
                element: <RegisterPage />
            },
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "teacher",
                element: <ProtectedRoute allowedRoles={["Teacher"]} />,
                children: [
                    {
                        path: "requests",
                        element: <RequestsPage />
                    },
                    {
                        path: "requests/create",
                        element: <NewRequest />
                    },

                    {
                        path: "requests/:id",
                        element: <RequestDetailsPage />
                    }
                ]
            },
            {
                path: "responsible",
                element: <ProtectedRoute allowedRoles={["Responsible"]} />,
                children: [
                    {
                        path: "requests",
                        element: <RequestsPage />
                    },
                    {
                        path: "requests/:id",
                        element: <RequestDetailsPage />
                    }
                ]

            },
            {

                path: "manager",
                element: <ProtectedRoute allowedRoles={["Manager"]} />,
                children: [
                    {
                        index: true,
                        element: <ManagerPage />
                    }
                ]
            },

            {
                path: "change-password",
                element: <ChangePassword />
            }

        ]
    }
])
export default routes
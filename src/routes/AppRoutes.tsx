import { createBrowserRouter, Navigate } from "react-router";
import RegisterPage from "../pages/RegisterPage"
import LoginPage from "../pages/LoginPage";
import App from "../App";
import ManagerPage from "../pages/ManagerPage";
import ResponsibleRequests from "../pages/responsibleRequestsPage";
import ChangePassword from "../pages/ChangePassword";
import ResponsibleRequestDetails from "../pages/responsibleRequestDetailsPage";
//import TeacherRequestsPage from "../pages/TeacherRequestsPage";
//import CreateRequestPage from "../pages/CreateRequestPage";
//import TeacherRequestDetailsPage from "../pages/TeacherRequestDetailsPage";
//import ManagerRequestsPage from "../pages/ManagerRequestsPage";
//import ManagerRequestDetailsPage from "../pages/ManagerRequestDetailsPage";
//import App from "../App";
const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index:true,
                element:<Navigate to="/login" replace/>
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
                children: [
                    {
                        path: "requests",
                        element: <ResponsibleRequests />
                    },
                    // {
                    //     path: "requests/create",
                    //     element: <CreateRequestPage />
                    // },
                    {
                        path: "requests/:id",
                        element: <ResponsibleRequestDetails />
                    }
                ]
            },
            {
                path: "responsible",
                children: [
                    {
                        path: "requests",
                        element: <ResponsibleRequests />
                    },
                    {
                        path: "requests/:id",
                        element: <ResponsibleRequestDetails/>
                    }
                ]

            },
            {
                path: "manager",
                element: <ManagerPage></ManagerPage>
            },
            {
                path: "change-password",
                element: <ChangePassword />
            }

        ]
    }
])
export default routes
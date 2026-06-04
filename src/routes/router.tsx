import { Homelayout } from "../components";
import Homepage from "../pages/Homepage";
import { createBrowserRouter } from "react-router-dom";
import SignUp from "../pages/Auth/Signup";
import Login from "../pages/Auth/Login";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import DashboardLayout from "../components/layout/DashboardLayout";
import Transactions from "../pages/Dashboard/Transaction";
import Cards from "../pages/Dashboard/Cards";
import Investments from "../pages/Dashboard/Investment";
import Settings from "../pages/Dashboard/Settings";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword";
import VerifyEmail from "../pages/Auth/Verifyemail";

export const Router = createBrowserRouter([
    {
        path: "/",
        element: <Homelayout />,
        children: [
            {
                index: true,
                element: <Homepage />
            }
        ]
    },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: <DashboardHome />
            },
            {
                path: "/dashboard/transactions",
                element: <Transactions/>
            },
            {
                path: "/dashboard/cards",
                element: <Cards />
            },
            {
                path: "/dashboard/investments",
                element: <Investments />
            },
            {
                path: "/dashboard/settings",
                element: <Settings />
            }
        ]
    },
    {
        path: "/open-Account",
        element: <SignUp />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/forgotpassword",
        element: <ForgotPassword />
    },
    {
        path: "/reset-password",
        element: <ResetPassword />
    },
    {
        path: "/verify-email",
        element: <VerifyEmail />
    }
])
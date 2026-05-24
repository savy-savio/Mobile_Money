import { Homelayout } from "../components";
import Homepage from "../pages/Homepage";
import { createBrowserRouter } from "react-router-dom";
import SignUp from "../pages/Auth/Signup";
import Login from "../pages/Auth/Login";

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
        path: "/open-Account",
        element: <SignUp />
    },
    {
        path: "/login",
        element: <Login />
    }
])
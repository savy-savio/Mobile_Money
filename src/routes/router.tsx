import { Homelayout } from "../components";
import Homepage from "../pages/Homepage";
import { createBrowserRouter } from "react-router-dom";
// import SignUp from "../pages/Auth/Signup";

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
    // {
    //     path: "/openaccount",
    //     element: <SignUp />
    // }
])
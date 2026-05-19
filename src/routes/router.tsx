import { Homelayout } from "../components";
import Homepage from "../pages/Homepage";
import { createBrowserRouter } from "react-router-dom";

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
    }
])
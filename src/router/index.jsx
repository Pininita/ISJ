import {createBrowserRouter, Outlet} from "react-router-dom";
import HomePage from "../pages/home/Home.jsx";
import RecordPage from "../pages/record/record.jsx";
import AboutPage from "../pages/about/about.jsx";
import Navbar from "../layouts/dashboard/component/navbar.jsx";

const Layout = () => {
    return (
        <div className='flex flex-col gap-3'>
            <Navbar />
            <Outlet />
        </div>
    );
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/home",
                element: <HomePage />
            },
            {
                path: "/record",
                element: <RecordPage />
            },
            {
                path: "/about",
                element: <AboutPage />
            }
        ]
    }
])


export default router
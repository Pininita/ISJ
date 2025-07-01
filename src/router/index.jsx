// routes/index.js - Tu router actualizado con autenticación
import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import HomePage from "@/pages/home/Home.jsx";
import RecordPage from "@/pages/record/record.jsx";
import AboutPage from "@/pages/about/about.jsx";
import LoginPage from "@/pages/auth/LoginPage.jsx";
import RegisterPage from "@/pages/auth/RegisterPage.jsx";
import Navbar from "@/layouts/dashboard/component/navbar.jsx";
import { useAuth } from "@/modules/auth/context/AuthContext.jsx";

// Layout protegido con Navbar
const ProtectedLayout = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace />;
    }

    return (
        <div className='flex flex-col gap-1'>
            <Navbar />
            <Outlet />
        </div>
    );
};

// Layout para autenticación (sin navbar)
const AuthLayout = () => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedLayout />,
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
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "register", 
                element: <RegisterPage />
            }
        ]
    },
    // Ruta 404 - redirige a home
    {
        path: "*",
        element: <Navigate to="/" replace />
    }
]);

export default router;
import { ApolloProvider } from '@apollo/client';
import { RouterProvider } from "react-router-dom";
import client from "../client.js";
import router from "./router/index.jsx";
import { AuthProvider } from "@/modules/auth/context/AuthContext.jsx"


function App() {
    return (
        <>
            <ApolloProvider client={client}>
                <AuthProvider>
                    <RouterProvider router={router} />
                </AuthProvider>
            </ApolloProvider>
        </>
    )
}

export default App

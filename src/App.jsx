import { ApolloProvider } from '@apollo/client';
import { RouterProvider } from "react-router-dom";
import client from "../client.js";
import router from "@/router/index.jsx";
import { AuthProvider } from "@/modules/auth/context/AuthContext.jsx"
import MeProvider from '@/modules/auth/context/MeProvider.jsx';
import VantaBackground from './components/ui/background/VantaBackground.jsx';


function App() {
    return (
        <div className='relative min-h-screen w-full overflow-hidden'>

            <ApolloProvider client={client}>
                <AuthProvider>
                    <MeProvider>
                        <RouterProvider router={router} />
                    </MeProvider>
                </AuthProvider>
            </ApolloProvider>

        </div>
    )
}

export default App

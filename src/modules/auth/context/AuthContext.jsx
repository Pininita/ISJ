import React, { createContext, useContext, useState, useEffect } from 'react';
import { useApolloClient, useQuery } from '@apollo/client';
import { GET_ME } from '@/gql/queries';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const client = useApolloClient();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [shouldFetchUser, setShouldFetchUser] = useState(false); // inicia como false

    const { data, loading: queryLoading, error } = useQuery(GET_ME, {
        skip: !shouldFetchUser,
        errorPolicy: 'ignore'
    });

    console.log(data, ' soy data ');
    

    useEffect(() => {
        const token = localStorage.getItem('access_token'); // ← aquí sí puedes leer el token

        console.log('useEffect ejecutado:', {
            token: !!token,
            queryLoading,
            data,
            error
        });

        if (!token) {
            console.log('No hay token, limpiando estado...');
            setLoading(false);
            setIsAuthenticated(false);
            setUser(null);
            return;
        }

        if (!queryLoading) {
            if (data?.me) {
                setUser(data.me);
                setIsAuthenticated(true);
            } else if (error) {
                console.log('Error en query:', error);
                localStorage.removeItem('access_token');
                setIsAuthenticated(false);
                setUser(null);
            }
            setLoading(false);
        }
    }, [data, queryLoading, error]);

    const login = async (token, userData) => {
        console.log('Login ejecutado:', { token: !!token, userData });
        localStorage.setItem('access_token', token);
        setUser(userData);
        setIsAuthenticated(true);
        setShouldFetchUser(true); // ← activa la consulta GET_ME

        await client.clearStore();
        await client.refetchQueries({
            include: [GET_ME],
        });
    };

    const logout = async () => {
        console.log('Logout ejecutado');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        await client.clearStore();
        setUser(null);
        setIsAuthenticated(false);
        setShouldFetchUser(false);
    };

    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
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
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Verificar si hay token al cargar
    const token = localStorage.getItem('access_token');
    
    const { data, loading: queryLoading, error } = useQuery(GET_ME, {
        skip: !token,
        errorPolicy: 'ignore'
    });

    useEffect(() => {
        if (!token) {
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
                // Token inválido o expirado
                localStorage.removeItem('access_token');
                setIsAuthenticated(false);
                setUser(null);
            }
            setLoading(false);
        }
    }, [data, queryLoading, error, token]);

    const login = (token, userData) => {
        localStorage.setItem('access_token', token);
        setUser(userData);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        setUser(null);
        setIsAuthenticated(false);
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
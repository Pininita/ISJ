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
    
    // Debug: Verificar token
    console.log('Token encontrado:', token ? 'Sí' : 'No');
    
    const { data, loading: queryLoading, error } = useQuery(GET_ME, {
        skip: !token,
        errorPolicy: 'ignore'
    });

    // Debug: Mostrar datos de la query
    console.log('Query GET_ME:', {
        data,
        loading: queryLoading,
        error,
        skip: !token
    });

    useEffect(() => {
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
                console.log('Usuario encontrado:', data.me);
                setUser(data.me);
                setIsAuthenticated(true);
            } else if (error) {
                console.log('Error en query:', error);
                // Token inválido o expirado
                localStorage.removeItem('access_token');
                setIsAuthenticated(false);
                setUser(null);
            } else {
                console.log('No hay datos ni error, pero query terminó');
            }
            setLoading(false);
        }
    }, [data, queryLoading, error, token]);

    const login = (token, userData) => {
        console.log('Login ejecutado:', { token: !!token, userData });
        localStorage.setItem('access_token', token);
        setUser(userData);
        setIsAuthenticated(true);
    };

    const logout = () => {
        console.log('Logout ejecutado');
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

    // Debug: Estado actual
    console.log('Estado actual del contexto:', {
        user,
        isAuthenticated,
        loading,
        userId: user?.id
    });

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
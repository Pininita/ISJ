import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_MUTATION } from '@/gql/mutations';
import { useAuth } from '@/modules/auth/context/AuthContext';
import { notifications } from '@/components/ui/Toast/ToastNotifications';
import { AuthLayout } from '@/layouts/auth/AuthLayout';

const LoginPage = () => {
     const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const { login } = useAuth();
    const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION);

    // ⬇️ Al cargar la página, insertamos el usuario si no existe
    useEffect(() => {
        const existingUser = localStorage.getItem('user');
        if (!existingUser) {
            const fakeUser = {
                username: 'test123',
                email: 'test123@gmail.com',
                password: 'test123'
            };
            localStorage.setItem('user', JSON.stringify(fakeUser));
        }
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: ''
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        // 🔐 Validar contra el usuario local
        const savedUser = JSON.parse(localStorage.getItem('user'));

        if (
            savedUser &&
            savedUser.username === formData.username &&
            savedUser.password === formData.password
        ) {
            // Login simulado sin GraphQL
            const tokenFake = 'fake-token-123';
            login(tokenFake, { username: savedUser.username });
            notifications.loginSuccess();
            navigate('/home');
            return;
        }

        // Si no coincide con el usuario local, intenta con GraphQL
        try {
            const { data } = await loginMutation({
                variables: {
                    username: formData.username,
                    password: formData.password
                }
            });

            if (data.tokenAuth.token) {
                const userData = {
                    username: formData.username,
                };

                login(data.tokenAuth.token, userData);
                notifications.loginSuccess();
                navigate('/home');
            }
        } catch (error) {
            console.error('Error de login:', error);
            notifications.loginError(error);
            setErrors({
                general: 'Credenciales inválidas. Por favor, intenta de nuevo.'
            });
        }
    };
    return (
        <AuthLayout>
            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-100">
                            Iniciar Sesión
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-400">
                            ¿No tienes cuenta?{' '}
                            <Link to="/auth/register" className="font-medium text-blue-600 hover:text-blue-500">
                                Regístrate aquí
                            </Link>
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="username" className="sr-only">
                                    Usuario
                                </label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-300 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                    placeholder="Usuario"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Contraseña
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-300 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                    placeholder="Contraseña"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {errors.general && (
                            <div className="text-red-600 text-sm text-center">
                                {errors.general}
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthLayout >
    );
};

export default LoginPage;
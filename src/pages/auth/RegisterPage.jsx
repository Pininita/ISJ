import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { REGISTER_MUTATION } from '@/gql/mutations';
import { notifications } from '@/components/ui/Toast/ToastNotifications';
import { AuthLayout } from '@/layouts/auth/AuthLayout';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const [registerMutation, { loading }] = useMutation(REGISTER_MUTATION);

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

    const validateForm = () => {
        const newErrors = {};

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden';
        }

        if (formData.password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        }

        if (!formData.email.includes('@')) {
            newErrors.email = 'Email inválido';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const { data } = await registerMutation({
                variables: {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                }
            });

            if (data?.createUser?.user?.id) {
                notifications.accountCreated(formData.username);
                setTimeout(() => {
                    navigate('/auth/login')
                }, 1500)

            } else {
                notifications.accountError('Error al crear la cuenta. Intentalo de nuevo.')
                setErrors({ general: 'Error al crear la cuenta. Inténtalo de nuevo.' });
            }
        } catch (error) {
            console.error('Error de registro:', error);

            const errorMessage = 'Error al crear la cuenta. Inténtalo de nuevo.';

            if (error.graphQLErrors?.length > 0) {
                setErrors({ general: errorMessage });
            } else {
                setErrors({ general: 'Error al crear la cuenta. Intenta de nuevo.' });
            }

            notifications.accountError(errorMessage);
            setErrors({ general: errorMessage });
        }
    };

    return (
        <AuthLayout>
            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-100">
                            Crear Cuenta
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-400">
                            ¿Ya tienes cuenta?{' '}
                            <Link to="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
                                Inicia sesión
                            </Link>
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                                    Usuario
                                </label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Usuario"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="tu@email.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                    Contraseña
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Contraseña"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                                    Confirmar Contraseña
                                </label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Confirmar contraseña"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
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
                                {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthLayout>
    );
};

export default RegisterPage;
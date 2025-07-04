import { toast } from "react-toastify";

const defaultConfig = {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
}

export const notifications = {
    loginSuccess: (userName = '') => {
        const message = userName
        ? `¡Bienvenido ${userName}! Sesión iniciada correctamente`
        : 'Sesión iniciada correctamente';

        toast.success(message, {
            ...defaultConfig,
            autoClose: 3000,
        })
    },

    loginError: (errorMessage = 'Credenciales incorrectas') => {
        toast.error(`Error al iniciar sesión: ${errorMessage}`, {
                ...defaultConfig,
                autoClose: 5000,
            })
    },

    accountCreated: (userName = '') => {
        const message = userName
        ? `Cuenta creada exitosamente. Bienvenido ${userName}!`
        : 'Cuenta creada exitosamente. Bienvenido!';

        toast.success(message, {
            ...defaultConfig,
            autoClose: 3000,
        })
    },

    accountError: (errorMesagge = 'Intenta de nuevo.') => {
        toast.error(`Error al crear la cuenta: ${errorMesagge}`, {
            ...defaultConfig,
            autoClose: 5000,
        })
    },

    logoutSuccess: () => {
        toast.info('Sesión cerrada correctamente', {
            ...defaultConfig,
            autoClose: 3000,
        })
    },

    transactionAdded: (amount = '') => {
        const message = amount
        ? `Transacción agregada exitosamente: ${amount}`
        : 'Transacción agregada exitosamente';

        toast.success(message, {
            ...defaultConfig,
            autoClose: 3000,
        })
    },


    transactionError: (errorMessage = 'No se pudo agregar la transacción') => {
        toast.error(`Error al agregar la transacción: ${errorMessage}`, {
            ...defaultConfig,
            autoClose: 5000,
        })
    },

}
import React from 'react';

const AboutPage = () => {
    return (
        <div>
            <h1>Sobre esta aplicación</h1>
            <p>
                Esta herramienta fue creada con el único propósito de llevar un control
                sencillo y práctico de ingresos y egresos monetarios. Fue desarrollada
                específicamente para mis padres, quienes necesitaban una forma clara
                y organizada de visualizar sus movimientos financieros.
            </p>
            <p>
                No tiene fines comerciales ni se recopila ningún tipo de dato externo.
                El uso es completamente personal y privado.
            </p>
            <p>
                Sin embargo, si llegas aquí por recomendación o por curiosidad y te interesa
                implementar algo similar, puedes contactarme directamente para conversar más.
            </p>
            <p>
                📧 Puedes escribirme a: <strong>devdanielsanabria@gmail.com</strong>
            </p>
            <p>
                📱 O contáctame por <a href="https://wa.me/573126898866" target="_blank"
                                      rel="noopener noreferrer">WhatsApp</a>
            </p>
        </div>
    );
};

export default AboutPage;
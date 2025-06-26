import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';


const HomeForm = () => {
    const [startDate, setStartDate] = useState(null);

    return (
        <div className="flex justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-10">
            <Formik
                initialValues={{
                    tipo: '',
                    quantity: '',
                    description: '',
                    city: '',
                    place: '',
                    date: null,
                }}
                onSubmit={(values) => {
                    console.log({ ...values, date: startDate });
                }}
            >
                {({ setFieldValue }) => (
                    <Form className="max-w-lg w-full bg-white shadow-2xl rounded-2xl p-8 border border-blue-200">
                        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Registrar Movimiento</h2>
                        <div className="flex flex-col gap-6">
                            {/* Type */}
                            <div>
                                <label htmlFor="type" className="block text-lg font-semibold text-blue-600 mb-2">Tipo</label>
                                <Field
                                    as="select"
                                    id="type"
                                    name="type"
                                    className="p-3 w-full text-base text-blue-700 bg-blue-50 border-2 rounded-lg border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                >
                                    <option value="">Selecciona tipo</option>
                                    <option value="ingreso">Ingreso</option>
                                <option value="egreso">Egreso</option>
                                </Field>
                            </div>
                            {/* Cash */}
                            <div className="flex gap-6">
                                <div className="flex-1">
                                    <label htmlFor="quantity"
                                           className="block text-base font-semibold text-blue-600 mb-2">
                                        Dinero/Cantidad
                                    </label>
                                    <Field
                                        type="number"
                                        id="quantity"
                                        name="quantity"
                                        className="w-full rounded-lg border-2 border-blue-200 p-3 text-base bg-blue-50 text-blue-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-300 transition"
                                    />
                                </div>
                            </div>
                            {/* City and place */}
                            <div className="flex gap-6">
                                <div className="flex-1">
                                    <label className="block text-base font-semibold text-blue-600 mb-2">Ciudad</label>
                                    <Field
                                        type="text"
                                        name="city"
                                        placeholder="Ej. Armenia"
                                        className="w-full rounded-lg border-2 border-blue-200 p-3 text-base bg-blue-50 text-blue-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-300 transition"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-base font-semibold text-blue-600 mb-2">Lugar</label>
                                    <Field
                                        type="text"
                                        name="place"
                                        placeholder="Ej. Unicentro"
                                        className="w-full rounded-lg border-2 border-blue-200 p-3 text-base bg-blue-50 text-blue-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-300 transition"
                                    />
                                </div>
                            </div>
                            {/* Description */}
                            <div>
                                <label htmlFor="message"
                                       className="block text-base font-semibold text-blue-600 mb-2">
                                    Descripción
                                </label>
                                <textarea
                                    id="message"
                                    rows="4"
                                    className="block w-full p-4 text-base text-blue-700 bg-blue-50 rounded-lg border-2 border-blue-200 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition"
                                    placeholder="Descripción de la acción, Ej. Mercancía, Pago cliente, Domicilio, etc."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="mt-4 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition transform hover:scale-105"
                            >
                                Guardar
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default HomeForm;
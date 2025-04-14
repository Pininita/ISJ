import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';


const HomeForm = () => {
    const [startDate, setStartDate] = useState(null);

    return (
        <div className='flex justify-center p-4 '>
            <Formik
                initialValues={{
                    tipo: '',
                    dinero: '',
                    descripcion: '',
                    ciudad: '',
                    lugar: '',
                    fecha: null,
                }}
                onSubmit={(values) => {
                    console.log({ ...values, fecha: startDate });
                }}
            >
                {({ setFieldValue }) => (
                    <Form className="max-w-sm m-4 w-full">
                        <div className="flex flex-col gap-4">
                            {/* Tipo */}
                            <div className="flex justify-evenly items-center">
                                <div>
                                    <label htmlFor="tipo" className="sr-only text-lg">Tipo</label>
                                    <Field
                                        as="select"
                                        id="tipo"
                                        name="tipo"
                                        className="p-4 block w-full text-lg text-gray-500 bg-transparent border-2 rounded-lg border-gray-200 dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                                    >
                                        <option value="">Tipo</option>
                                        <option value="ingreso">Ingreso</option>
                                        <option value="egreso">Egreso</option>
                                    </Field>
                                </div>
                            </div>
                            {/* Fecha y dinero */}
                            <div className="mb-4 flex justify-between">
                                <div>
                                    <label className="block text-base font-medium text-gray-700 mb-1">Fecha</label>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => {
                                            setStartDate(date);
                                            setFieldValue('fecha', date);
                                        }}
                                        dateFormat="yyyy-MM-dd"
                                        className="w-full rounded-md border border-gray-300 p-3 text-base shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                        placeholderText="Selecciona una fecha"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="dinero"
                                           className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                                        Dinero/Cantidad
                                    </label>
                                    <Field
                                        type="number"
                                        id="dinero"
                                        name="dinero"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            {/* Ciudad y lugar */}
                            <div className="mb-4 flex justify-between">
                                <div>
                                    <label className="block text-base font-medium text-gray-700 mb-1">Ciudad</label>
                                    <Field
                                        type="text"
                                        name="ciudad"
                                        placeholder="Ej. Ciudad de México"
                                        className="w-full rounded-md border border-gray-300 p-3 text-base shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    />
                                </div>
                                <div className="mb-4">
                                <label className="block text-base font-medium text-gray-700 mb-1">Lugar</label>
                                    <Field
                                        type="text"
                                        name="lugar"
                                        placeholder="Ej. Oficina principal"
                                        className="w-full rounded-md border border-gray-300 p-3 text-base shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    />
                                </div>
                            </div>
                            {/* Descripción */}
                            <div className="p-3 relative w-full min-w-[200px]">
                                <label htmlFor="message"
                                       className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Your
                                    message</label>
                                <textarea id="message" rows="4"
                                          className="block p-4 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                          placeholder="Write your thoughts here..."></textarea>
                            </div>

                            <button
                                type="submit"
                                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
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
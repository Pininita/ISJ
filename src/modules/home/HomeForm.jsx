import { Formik, Form, Field, ErrorMessage } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';

const HomeForm = () => {
    const [startDate, setStartDate] = useState(null);

    return (
        <div>
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
                    <Form className="max-w-sm mx-auto m-4">
                        <div className="flex flex-col gap-2 p-2">

                            {/* Tipo y Dinero */}
                            <div className="flex justify-evenly">
                                <div>
                                    <label htmlFor="tipo" className="sr-only text-base">Tipo</label>
                                    <Field
                                        as="select"
                                        id="tipo"
                                        name="tipo"
                                        className="block py-2.5 px-0 w-full text-base text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                                    >
                                        <option value="">Tipo</option>
                                        <option value="ingreso">Ingreso</option>
                                        <option value="egreso">Egreso</option>
                                    </Field>
                                </div>

                                <div>
                                    <label htmlFor="dinero" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Dinero/Cantidad
                                    </label>
                                    <Field
                                        type="number"
                                        id="dinero"
                                        name="dinero"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Fecha */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => {
                                        setStartDate(date);
                                        setFieldValue('fecha', date);
                                    }}
                                    dateFormat="yyyy-MM-dd"
                                    className="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    placeholderText="Selecciona una fecha"
                                />
                            </div>

                            {/* Descripción */}
                            <div className="relative w-full min-w-[200px]">
                                <Field
                                    as="textarea"
                                    name="descripcion"
                                    className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0"
                                    placeholder=" "
                                />
                                <label className="pointer-events-none absolute left-0 -top-1.5 text-[11px] font-normal text-blue-gray-400 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900">
                                    Descripción
                                </label>
                            </div>

                            {/* Ciudad */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
                                <Field
                                    type="text"
                                    name="ciudad"
                                    placeholder="Ej. Ciudad de México"
                                    className="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                />
                            </div>

                            {/* Lugar */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Lugar</label>
                                <Field
                                    type="text"
                                    name="lugar"
                                    placeholder="Ej. Oficina principal"
                                    className="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                />
                            </div>

                            <button
                                type="submit"
                                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
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
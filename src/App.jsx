import React, {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function App() {
    const [startDate, setStartDate] = useState(new Date())

    return (
        <div className='flex flex-col gap-3'>
            <div className='bg-neutral-500 h-10'>
                <ul className='flex flex-row justify-center items-center gap-16 h-full'>
                    <li>
                        <a className='cursor-pointer'>Inicio</a>
                    </li>
                    <li>
                        <a className='cursor-pointer'>Historial</a>
                    </li>
                    <li>
                        <a className='cursor-pointer'>Acerca</a>
                    </li>
                    <li>
                        <a className='cursor-pointer'>perfil</a>
                    </li>
                </ul>
            </div>

            <form className="max-w-sm mx-ato m-4">
                <div className='flex flex-col gap-2 p-2'>
                    <div className='flex justify-evenly'>

                        <div>
                            <label htmlFor="earn-type" className="sr-only text-base ">Tipo</label>
                            <select id="earn-type"
                                    className="block py-2.5 px-0 w-full text-base text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                                <option selected>Tipo</option>
                                <option value="ingreso">Ingreso</option>
                                <option value="egreso">Egreso</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="money"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dinero/Cantidad</label>
                            <input type="number" id="money"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                        </div>

                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Fecha
                        </label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="yyyy-MM-dd"
                            className="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            placeholderText="Selecciona una fecha"
                        />
                    </div>
                    <br/>
                    {/*text area for description*/}

                    <div className="relative w-full min-w-[200px]">
                        <textarea
                            className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" ">
                        </textarea>
                        <label
                            className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Descripcion
                        </label>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ciudad
                        </label>
                        <input
                            type="text"
                            name="ciudad"
                            placeholder="Ej. Ciudad de México"
                            className="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Lugar
                        </label>
                        <input
                            type="text"
                            name="lugar"
                            placeholder="Ej. Oficina principal"
                            className="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                    </div>


                </div>
            </form>
        </div>
    )
}

export default App

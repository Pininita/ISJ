import React, {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import HomeForm from "./modules/home/HomeForm.jsx";


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
                </ul>
            </div>

            <HomeForm/>

        </div>
    )
}

export default App

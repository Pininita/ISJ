import React from 'react';
import  { Link } from "react-router-dom";
import {FaHistory, FaHome} from "react-icons/fa";
import {AiFillAliwangwang} from "react-icons/ai";

const Navbar = () => {
    return (
            <div className='bg-blue-400 h-10'>
                <ul className='flex flex-row justify-center items-center gap-16 h-full'>
                    <li>
                        <Link to='/home' className='cursor-pointer flex items-center gap-2 text-lg'>
                           <FaHome />
                            Inicio
                        </Link>
                    </li>
                    <li>
                        <Link to='/record' className='cursor-pointer flex items-center gap-2 text-lg'>
                            <FaHistory />
                            Historial
                        </Link>
                    </li>
                    <li>
                        <Link to='/about' className='cursor-pointer flex items-center gap-2 text-lg'>
                            <AiFillAliwangwang />
                            Acerca
                        </Link>
                    </li>
                </ul>
            </div>
    );
};

export default Navbar;
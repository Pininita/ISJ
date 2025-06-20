import React from 'react';
import  { Link } from "react-router-dom";
import {FaHistory, FaHome} from "react-icons/fa";
import {AiFillAliwangwang} from "react-icons/ai";

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-5xl mx-auto px-10">
                <ul className="flex justify-between items-center h-14">
                    <li>
                        <Link
                            to="/home"
                            className="flex items-center gap-2 px-4 py-2 rounded-md text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200 font-semibold"
                        >
                            <FaHome size={20} />
                            Inicio
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/record"
                            className="flex items-center gap-2 px-4 py-2 rounded-md text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200 font-semibold"
                        >
                            <FaHistory size={20} />
                            Historial
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/about"
                            className="flex items-center gap-2 px-4 py-2 rounded-md text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200 font-semibold"
                        >
                            <AiFillAliwangwang size={22} />
                            Acerca
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
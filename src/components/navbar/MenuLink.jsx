import React from 'react'
import { Link } from 'react-router-dom'

const MenuLink = ({
    icon: Icon,
    title,
    link,
    onClick,
    className = "",
    iconSize = 18,
    isMobile = false
}) => {
    const baseClases = isMobile
    ? "flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 font-medium"
    : "flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 font-medium";

    return (
        <Link
        to={link}
        onClick={onClick}
        className={`${baseClases} ${className}`}
        >
            <Icon size={iconSize} className={isMobile ? "text-gray-500" : ""} />
            <span>{title}</span>
        </Link>
    )
}

export default MenuLink;
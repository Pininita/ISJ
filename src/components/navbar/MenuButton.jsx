import React from 'react'

const MenuButton = ({
    icon: Icon,
    title,
    className = "",
    iconSize = 16,
    variant = "default", // default, primary, secondary
    onClick
}) => {
    const getVariantClasses = () => {
        switch (variant) {
            case "danger":
                return "text-red-600 hover:bg-red-50";
            default:
                return "text-gray-700 hover:bg-gray-50";

        }
    }
  return (
    <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors duration-200 dont-medium ${getVariantClasses()} ${className}`}
    >
        <Icon size={iconSize} />
        <span>{title}</span>
    </button>
  )
}

export default MenuButton
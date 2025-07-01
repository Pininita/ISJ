import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHistory, FaHome, FaUser, FaSignOutAlt, FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';
import { AiFillAliwangwang } from 'react-icons/ai';
import { useAuth } from '@/modules/auth/context/AuthContext';
import MenuLink from '@/components/navbar/MenuLink'; 
import MenuButton from '@/components/navbar/MenuButton';
import UserInfo from '@/components/navbar/UserInfo';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Configuración de los enlaces de navegación
  const navigationLinks = [
    {
      icon: FaHome,
      title: "Inicio",
      link: "/home"
    },
    {
      icon: FaHistory,
      title: "Historial",
      link: "/record"
    },
    {
      icon: AiFillAliwangwang,
      title: "Acerca",
      link: "/about",
      iconSize: 20
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Cerrar menú móvil al cambiar de ruta
  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-blue-600">ISJ Inventory</h1>
          </div>

          {/* Navigation Links - Centro (Desktop) */}
          <div className="hidden md:block">
            <div className="flex space-x-10">
              {navigationLinks.map((item, index) => (
                <MenuLink
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  link={item.link}
                  iconSize={item.iconSize}
                />
              ))}
            </div>
          </div>

          {/* User Dropdown - Derecha (Desktop) */}
          <div className="hidden md:block relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium"
            >
              <FaUser size={16} className="text-gray-500" />
              <span>{user?.username || 'Usuario'}</span>
              <FaChevronDown 
                size={12} 
                className={`text-gray-400 transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm text-gray-500">Conectado como</p>
                  <p className="text-sm font-medium text-gray-900">{user?.username}</p>
                  <p className="text-sm text-gray-700">unemailcualquiera@gmail.com</p>
                </div>
                <MenuButton
                  icon={FaSignOutAlt}
                  title="Cerrar Sesión"
                  onClick={handleLogout}
                  variant="danger"
                  className="px-4 py-2"
                />
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <FaTimes size={20} />
              ) : (
                <FaBars size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200 bg-white">
              
              {/* User Info Section */}
              <UserInfo 
                user={user?.username}
                email="unemailcualquiera@gmail.com"
              />

              {/* Navigation Links */}
              {navigationLinks.map((item, index) => (
                <MenuLink
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  link={item.link}
                  onClick={handleMobileLinkClick}
                  iconSize={item.iconSize}
                  isMobile={true}
                />
              ))}

              {/* Logout Button */}
              <div className="border-t border-gray-200 pt-2 mt-2">
                <MenuButton
                  icon={FaSignOutAlt}
                  title="Cerrar Sesión"
                  onClick={handleLogout}
                  variant="danger"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
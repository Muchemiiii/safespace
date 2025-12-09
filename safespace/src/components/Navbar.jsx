import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Report', path: '/report' },
    ];

    return (
        <nav className="fixed w-full z-50 top-0 start-0 bg-purple-950 shadow-md border-b border-purple-800/50 dark:bg-gray-900/80 dark:border-gray-700/50 transition-all duration-300">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse group">
                    <div className="flex items-center justify-center">
                        <img src="/safespace-logo.png" alt="Safespace Logo" className="w-12 h-12 object-contain" />
                    </div>
                    <span className="self-center text-4xl font-bold whitespace-nowrap transition-colors text-white">
                        Safespace
                    </span>
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <Link to="/about" className="text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-full text-sm px-6 py-2.5 text-center transition-all transform hover:scale-105 shadow-lg hover:shadow-purple-500/30">
                        Get started
                    </Link>
                    <button
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 transition-colors"
                        onClick={toggleMenu}
                        aria-controls="navbar-sticky"
                        aria-expanded={isOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
                <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 md:max-h-full opacity-0 md:opacity-100 overflow-hidden'}`} id="navbar-sticky">
                    <ul className={`flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700 ${isOpen ? 'shadow-xl md:shadow-none' : ''}`}>
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    to={link.path}
                                    className={`relative block py-2 px-3 rounded md:p-0 transition-colors ${location.pathname === link.path
                                        ? 'text-purple-400 font-bold'
                                        : 'text-white hover:text-purple-300'
                                        }`}
                                >
                                    {link.name}
                                    <span className={`absolute bottom-[-4px] left-0 h-0.5 bg-indigo-600 transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

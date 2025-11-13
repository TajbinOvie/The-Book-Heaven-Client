import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../Provider/AuthContext';
import Swal from 'sweetalert2';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { Sun, Moon } from 'lucide-react';

const Navbar = () => {
    const { user, signOutUserFunction } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || "light");

    useEffect(() => {
        const html = document.querySelector('html');
        html.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const navLinks = (
        <>
            <li>
                <NavLink className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-600 hover:text-white transition block" to="/">Home</NavLink>
            </li>
            <li>
                <NavLink className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-600 hover:text-white transition block" to="/books">All Books</NavLink>
            </li>
            <li>
                <NavLink className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-600 hover:text-white transition block" to="/add-book">Add Books</NavLink>
            </li>
            <li>
                <NavLink className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-600 hover:text-white transition block" to="/my-books">My Books</NavLink>
            </li>
        </>
    );

    const handleLogout = () => {
        signOutUserFunction()
            .then(() => Swal.fire("Logged out successfully"))
            .catch(e => Swal.fire(e.message));
    };

    const handleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <nav className="bg-blue-600 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    {/* Logo */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0 text-xl font-bold">
                            <NavLink to="/">Book Heaven</NavLink>
                        </div>
                        {/* Desktop menu */}
                        <div className="hidden lg:flex lg:ml-10">
                            <ul className="flex space-x-4">{navLinks}</ul>
                        </div>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center space-x-4">
                        {/* Theme toggle */}
                        <div>
                            <button
                                id="theme-toggle"
                                className="p-2 rounded-md hover:bg-blue-700 transition"
                                onClick={handleTheme}
                            >
                                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                            <Tooltip
                                anchorId="theme-toggle"
                                content="Toggle Theme"
                                className="bg-blue-700 text-white text-sm z-[9999]"
                                place="bottom"
                            />
                        </div>

                        {!user ? (
                            <>
                                <NavLink className="btn btn-outline btn-sm text-white border-white" to="/login">Login</NavLink>
                                <NavLink className="btn btn-primary btn-sm text-white" to="/register">Register</NavLink>
                            </>
                        ) : (
                            <div className="relative">
                                <img
                                    src={user.photoURL || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                                    alt="User"
                                    className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                />
                                {dropdownOpen && (
                                    <ul className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 z-50 text-gray-800">
                                        <li className="px-4 py-2 hover:bg-blue-100 rounded transition">
                                            <NavLink to="/profile" className="block">Profile</NavLink>
                                        </li>
                                        <li
                                            className="px-4 py-2 hover:bg-red-100 rounded cursor-pointer transition text-red-600"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </li>
                                    </ul>
                                )}
                            </div>
                        )}

                        {/* Mobile menu button */}
                        <div className="lg:hidden">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-2 rounded-md hover:bg-blue-700 transition"
                            >
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden mt-2 bg-blue-600 rounded-md shadow-lg p-2 space-y-2 text-white">
                        <ul>{navLinks}</ul>
                        {user && (
                            <div className="mt-2 border-t border-blue-400 pt-2">
                                <p className="px-3 py-2">{user.displayName || "User"}</p>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-3 py-2 hover:bg-red-500 rounded transition text-red-600"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;


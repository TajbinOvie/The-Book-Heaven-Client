import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../Provider/AuthContext';
import Swal from 'sweetalert2';


const Navbar = () => {
    const { user, signOutUserFunction } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const navLinks = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/books">All Books</NavLink></li>
            <li><NavLink to="/add-book">Add Books</NavLink></li>
            <li><NavLink to="/my-books">My Books</NavLink></li>
        </>
    );

    const handleLogout = () => {
        signOutUserFunction()
            .then(res => {
                console.log(res);
                Swal.fire("Log Out Successfull");
            }).catch(e => {
                console.log(e);
                Swal.fire(e.message);
            });
    };

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        {navLinks}
                    </ul>
                </div>
                <NavLink to="/" className="btn btn-ghost text-xl font-bold">Book Heaven</NavLink>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>

            <div className="navbar-end gap-2">
                {!user && (
                    <>
                        <NavLink to="/login" className="btn btn-outline btn-sm">Login</NavLink>
                        <NavLink to="/register" className="btn btn-primary btn-sm text-white">Register</NavLink>
                    </>
                )}

                {user && (
                    <div className="relative">
                        <img
                            src={user.photoURL || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                            alt="User"
                            className="w-10 h-10 rounded-full cursor-pointer"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        />
                        {dropdownOpen && (
                            <ul className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 z-[2]">
                                <li className="px-4 py-2 hover:bg-indigo-100 cursor-pointer">
                                    <NavLink to="/profile">Profile</NavLink>
                                </li>
                                <li
                                    className="px-4 py-2 hover:bg-red-100 cursor-pointer text-red-600"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </li>
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;


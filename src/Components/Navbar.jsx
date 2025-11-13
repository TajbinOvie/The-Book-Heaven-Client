import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../Provider/AuthContext';
import Swal from 'sweetalert2';

const Navbar = () => {
  const { user, signOutUserFunction } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [theme, setTheme] = useState(localStorage.getItem('theme') || "light")

  useEffect(() => {
    const html = document.querySelector('html')
    html.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className="hover:text-indigo-200 dark:hover:text-indigo-100">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/books" className="hover:text-indigo-200 dark:hover:text-indigo-100">
          All Books
        </NavLink>
      </li>
      <li>
        <NavLink to="/add-book" className="hover:text-indigo-200 dark:hover:text-indigo-100">
          Add Books
        </NavLink>
      </li>
      <li>
        <NavLink to="/my-books" className="hover:text-indigo-200 dark:hover:text-indigo-100">
          My Books
        </NavLink>
      </li>
    </>
  );

  const handleLogout = () => {
    signOutUserFunction()
      .then(res => {
        Swal.fire("Log Out Successful");
      })
      .catch(e => {
        Swal.fire(e.message);
      });
  };

  const handleTheme = (checked) => {
    setTheme(checked? "dark" : "light")
  };

  return (
    <div className="navbar bg-[#4c51e3] shadow-sm text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-white">
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
            className="menu menu-sm dropdown-content bg-white dark:bg-gray-800 rounded-box z-[1] mt-3 w-52 p-2 shadow dark:text-gray-200"
          >
            {navLinks}
          </ul>
        </div>
        <NavLink to="/" className="text-xl font-bold text-white">
          Book Heaven
        </NavLink>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-white">
          {navLinks}
        </ul>
      </div>

      <div className="navbar-end gap-2">
        <label className="flex cursor-pointer gap-2 items-center">
          <svg xmlns="http://www.w3.org/2000/svg"
            width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <input type="checkbox" className="toggle theme-controller" onChange={e => handleTheme(e.target.checked)} />
          <svg xmlns="http://www.w3.org/2000/svg"
            width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </label>

        {!user && (
          <>
            <NavLink to="/login" className="btn btn-outline btn-sm text-white border-white">
              Login
            </NavLink>
            <NavLink to="/register" className="btn btn-primary btn-sm text-white">
              Register
            </NavLink>
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
              <ul className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-2 z-[2] dark:text-gray-200">
                <li className="px-4 py-2 hover:bg-indigo-100 dark:hover:bg-indigo-700 cursor-pointer text-blue-600">
                  <NavLink to="/profile">Profile</NavLink>
                </li>
                <li
                  className="px-4 py-2 hover:bg-red-100 dark:hover:bg-red-700 cursor-pointer text-red-600 dark:text-red-400"
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

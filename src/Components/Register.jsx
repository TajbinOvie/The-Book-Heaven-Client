import { Eye, EyeClosed } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router';
import { auth } from '../Firebase/Firebase.config';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthContext';
import { getYear } from 'date-fns';

const Register = () => {
    const { createUserWithEmailAndPasswordFunction, provider, setUser } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const photoURL = e.target.photoURL.value;
        const password = e.target.password.value;

        const regEx = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

        if (!regEx.test(password)) {
            Swal.fire("Password must be at least 6 characters long and include at least one uppercase and one lowercase letter.");
            return;
        }

        createUserWithEmailAndPasswordFunction(email, password)
            .then(res => {
                Swal.fire("Register successful.");
            }).catch(e => {
                Swal.fire(e.message);
            });
    };

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then(res => {
                setUser(res.user);
                Swal.fire("Successfully registered with Google!");
            }).catch(e => {
                Swal.fire(e.message);
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-center text-indigo-600 dark:text-indigo-400 mb-6">
                    Create Account
                </h2>
                <form onSubmit={handleRegister} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your name"
                            className="input input-bordered w-full rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            className="input input-bordered w-full rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">PhotoURL</label>
                        <input
                            type="text"
                            name="photoURL"
                            placeholder=""
                            className="input input-bordered w-full rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                    </div>

                    <div className='relative'>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="••••••••"
                            className="input input-bordered w-full rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                        <span onClick={() => setShowPassword(!showPassword)} className='absolute right-2 top-[30px] cursor-pointer z-50 text-gray-600 dark:text-gray-300'>
                            {showPassword ? <Eye /> : <EyeClosed />}
                        </span>
                    </div>

                    {/* Main Register Button */}
                    <button
                        type="submit"
                        className="w-full btn bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg mt-3"
                    >
                        Register
                    </button>

                    {/* Google Register Button */}
                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="w-full btn btn-outline mt-2 flex items-center justify-center space-x-2 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
                    >
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                            alt="Google"
                            className="w-5 h-5"
                        />
                        <span>Register with Google</span>
                    </button>
                </form>

                <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-5">
                    Already have an account?{' '}
                    <Link to="/login" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
                        Login
                    </Link>
                </p>

                <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-6">
                    © {getYear(new Date())} Book Heaven. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Register;

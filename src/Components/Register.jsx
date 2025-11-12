import { Eye, EyeClosed } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router';
import { auth } from '../Firebase/Firebase.config';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthContext';



const Register = () => {

    const {createUserWithEmailAndPasswordFunction, provider, setUser} = useContext(AuthContext)

    const [showPassword, setShowPassword] = useState(false);
    // const [error, setError] = useState([]);

    const handleRegister = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const photoURL = e.target.photoURL.value;
        const password = e.target.password.value;

        console.log({ name, email, password, photoURL });

        const regEx = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

        if (!regEx.test(password)) {
            Swal.fire("Password must be at least 6 characters long and include at least one uppercase and one lowercase letter.");
            return;
        }

        createUserWithEmailAndPasswordFunction( email, password)
            .then(res => {
                console.log(res);
                Swal.fire("Register successful.");
            }).catch(e => {
                console.log(e);
                Swal.fire(e.message);
            });
    };

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then(res => {
                console.log(res);
                setUser(res.user);
                Swal.fire("Successfully registered with Google!");
            }).catch(e => {
                console.log(e);
                Swal.fire(e.message);
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Create Account</h2>
                <form onSubmit={handleRegister} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your name"
                            className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">PhotoURL</label>
                        <input
                            type="text"
                            name="photoURL"
                            placeholder=""
                            className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                    </div>

                    <div className='relative'>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="••••••••"
                            className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                        <span onClick={() => setShowPassword(!showPassword)} className='absolute right-2 top-[30px] cursor-pointer z-50'>
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
                        className="w-full btn btn-outline mt-2 flex items-center justify-center space-x-2"
                    >
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                            alt="Google"
                            className="w-5 h-5"
                        />
                        <span>Register with Google</span>
                    </button>
                </form>

                <p className="text-sm text-center text-gray-600 mt-5">
                    Already have an account?{' '}
                    <Link to="/login" className="text-indigo-600 font-medium hover:underline">
                        Login
                    </Link>
                </p>

                <p className="text-xs text-center text-gray-400 mt-6">
                    © {new Date().getFullYear()} Book Heaven. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Register;

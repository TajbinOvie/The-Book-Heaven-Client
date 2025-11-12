import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Eye, EyeClosed } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router';
import { auth } from '../Firebase/Firebase.config';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthContext';



const Login = () => {

    const {logInUserWithEmailAndPasswordFunction, provider, setUser} = useContext(AuthContext);

    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        console.log({ email, password });
        
        logInUserWithEmailAndPasswordFunction(email, password)
            .then(res => {
                console.log(res)
                setUser(res.user);
                Swal.fire("Successfully logged in!");
            }).catch(e => {
                console.log(e)
                Swal.fire(e.message);
            })
    };

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
             .then(res => {
                console.log(res)
                setUser(res.user);
                Swal.fire("Successfully logged in!");
            }).catch(e => {
                console.log(e)
                Swal.fire(e.message);
            })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
                    Welcome Back
                </h2>

                <form onSubmit={handleLogin} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className='relative'>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="••••••••"
                            className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                        <div className="text-right mt-1">
                            <Link
                                to="/forgot-password"
                                className="text-sm text-indigo-600 hover:underline font-medium"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <span onClick={() => setShowPassword(!showPassword)} className='absolute right-2 top-[30px] cursor-pointer z-50'>
                            {showPassword ? <Eye /> : <EyeClosed />}
                        </span>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full btn bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg mt-3"
                    >
                        Login
                    </button>

                    {/* Google Login Button */}
                    <button
                        onClick={handleGoogleSignIn}
                        type="button"
                        className="w-full btn btn-outline mt-2 flex items-center justify-center space-x-2 cursor-pointer"
                    >
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                            alt="Google"
                            className="w-5 h-5"
                        />
                        <span>Login with Google</span>
                    </button>
                </form>

                <p className="text-sm text-center text-gray-600 mt-5">
                    Don’t have an account?{' '}
                    <Link to="/register" className="text-indigo-600 font-medium hover:underline">
                        Register
                    </Link>
                </p>

                <p className="text-xs text-center text-gray-400 mt-6">
                    © {new Date().getFullYear()} Book Heaven. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Login;


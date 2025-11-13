import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthContext";
import { Link } from "react-router";
import Swal from "sweetalert2";
import LoadingSpinner from "./LoadingSpinner";

const Profile = () => {
    const { user, signOutUserFunction } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user !== undefined) {
            setLoading(false);
        }
    }, [user]);

    const handleLogout = async () => {
        try {
            await signOutUserFunction();
            Swal.fire("Logged out successfully!");
        } catch (error) {
            Swal.fire("Error logging out!");
            console.error(error);
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!user) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-lg text-gray-600 dark:text-gray-300">No user found. Please log in.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="flex justify-center p-4">
                <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8">
                    <div className="flex flex-col items-center">
                        {/* User Avatar */}
                        <img
                            src={user.photoURL || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                            alt="User Avatar"
                            className="w-28 h-28 rounded-full shadow-md border-2 border-indigo-300"
                        />

                        {/* User Name */}
                        <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-4">
                            {user.displayName || "Anonymous"}
                        </h2>

                        {/* User Email */}
                        <p className="text-gray-500 dark:text-gray-300 mt-1">{user.email}</p>
                    </div>

                    {/* Profile Details */}
                    <div className="mt-6 space-y-4">
                        <div className="flex justify-between items-center px-4 py-2 bg-indigo-50 dark:bg-indigo-900 rounded-lg">
                            <span className="font-medium text-gray-700 dark:text-gray-300">Full Name:</span>
                            <span className="text-gray-900 dark:text-gray-200">
                                {user.displayName || "Anonymous"}
                            </span>
                        </div>

                        <div className="flex justify-between items-center px-4 py-2 bg-indigo-50 dark:bg-indigo-900 rounded-lg">
                            <span className="font-medium text-gray-700 dark:text-gray-300">Email:</span>
                            <span className="text-gray-900 dark:text-gray-200">{user.email}</span>
                        </div>

                        <div className="flex justify-between items-center px-4 py-2 bg-indigo-50 dark:bg-indigo-900 rounded-lg">
                            <span className="font-medium text-gray-700 dark:text-gray-300">UID:</span>
                            <span className="text-gray-900 dark:text-gray-200">{user.uid}</span>
                        </div>
                    </div>

                   
                    <div className="mt-6 flex flex-col gap-3">
                        {/* <Link
                            to="/update-profile"
                            className="btn btn-outline btn-block text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-700"
                        >
                            Edit Profile
                        </Link> */}
                        <Link
                            to="/"
                            className="btn btn-outline btn-block text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-700"
                        >
                            Homepage
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="btn btn-primary btn-block text-white"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

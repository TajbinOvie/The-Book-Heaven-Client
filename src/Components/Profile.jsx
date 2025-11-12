import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthContext";
import { Link } from "react-router";
import Swal from "sweetalert2";

const Profile = () => {
    const { user, signOutUserFunction } = useContext(AuthContext);

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

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500 text-lg">No user found. Please login.</p>
            </div>
        );
    }

    return (
        <div className=" md:p-30 lg:p-50 bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center p-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
                <div className="flex flex-col items-center">
                    {/* User Avatar */}
                    <img
                        src={user.photoURL || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                        alt="User Avatar"
                        className="w-28 h-28 rounded-full shadow-md border-2 border-indigo-300"
                    />

                    {/* User Name */}
                    <h2 className="text-2xl font-bold text-indigo-600 mt-4">{user.displayName || "Anonymous"}</h2>

                    {/* User Email */}
                    <p className="text-gray-500 mt-1">{user.email}</p>
                </div>

                {/* Profile Details */}
                <div className="mt-6 space-y-4">
                    <div className="flex justify-between items-center px-4 py-2 bg-indigo-50 rounded-lg">
                        <span className="font-medium text-gray-700">Full Name:</span>
                        <span className="text-gray-900">{user.displayName || "Anonymous"}</span>
                    </div>

                    <div className="flex justify-between items-center px-4 py-2 bg-indigo-50 rounded-lg">
                        <span className="font-medium text-gray-700">Email:</span>
                        <span className="text-gray-900">{user.email}</span>
                    </div>

                    <div className="flex justify-between items-center px-4 py-2 bg-indigo-50 rounded-lg">
                        <span className="font-medium text-gray-700">UID:</span>
                        <span className="text-gray-900">{user.uid}</span>
                    </div>
                </div>

                {/* Edit Profile / Logout Buttons */}
                <div className="mt-6 flex flex-col gap-3">
                    <Link
                        to="/update-profile"
                        className="btn btn-outline btn-block text-indigo-600 hover:bg-indigo-50"
                    >
                        Edit Profile
                    </Link>
                    <Link
                        onClick={handleLogout}
                        className="btn btn-primary btn-block text-white"
                    >
                        Logout
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Profile;

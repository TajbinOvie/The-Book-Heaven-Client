import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthContext';

const UpdateProfile = () => {

    const {user} = useContext(AuthContext)

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
            <title>Update Profile</title>
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
                    Update Profile
                </h2>

                {/* Profile Preview Section */}
                <div className="flex flex-col items-center mb-6">
                    <img
                        src={user.photoURL || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                        alt="Profile"
                        className="w-24 h-24 rounded-full border-4 border-indigo-100 shadow-md mb-3"
                    />
                    <p className="text-gray-700 font-medium">{user.email}</p>
                </div>

                <form className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {user.displayName}
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Photo URL
                        </label>
                        <input
                            type="text"
                            placeholder="Enter image URL"
                            className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <button
                        type="button"
                        className="w-full btn bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg mt-3"
                    >
                        Update Profile
                    </button>
                </form>

                {/* Optional Back or Cancel */}
                <p className="text-sm text-center text-gray-600 mt-5">
                    Changed your mind?{" "}
                    <a href="/profile" className="text-indigo-600 font-medium hover:underline">
                        Go Back
                    </a>
                </p>

                <p className="text-xs text-center text-gray-400 mt-6">
                    © {new Date().getFullYear()} Book Heaven. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default UpdateProfile;

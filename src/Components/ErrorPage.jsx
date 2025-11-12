import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-100 px-6">
      <h1 className="text-9xl font-extrabold text-red-600">404</h1>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-4">
        Oops! Page not found
      </h2>
      <p className="text-gray-600 mt-2 text-center max-w-md">
        The page you are looking for does not exist or has been moved. Please check the URL or return to the homepage.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
      >
        Go to Homepage
      </Link>
      <div className="mt-10">
        <img
          src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
          alt="404 illustration"
          className="w-80 md:w-96"
        />
      </div>
    </div>
  );
};

export default ErrorPage;

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { FaStar, FaTrashAlt, FaBook } from "react-icons/fa";
import LoadingSpinner from "./LoadingSpinner";
import { AuthContext } from "../Provider/AuthContext";
import Swal from "sweetalert2";

const MyBooks = () => {
    const { user, } = useContext(AuthContext)
    console.log(user)
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch books by user email
    useEffect(() => {
        const fetchBooks = async () => {
            if (!user?.email) return; // wait until user is available

            try {
                const res = await axios.get(`http://localhost:3000/books?email=${user.email}`);
                setBooks(res.data.result || res.data);
            } catch (err) {
                console.error("Error fetching books:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [user]);

    // // Delete a book
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            try {
                const response = await axios.delete(`http://localhost:3000/books/${id}`);

                // update frontend list
                setBooks((prev) => prev.filter((book) => book._id !== id));

                await Swal.fire({
                    title: "Deleted!",
                    text: "The book has been deleted successfully.",
                    icon: "success",
                });

                console.log("Delete response:", response.data);

            } catch (error) {
                console.error("Error deleting book:", error);

                Swal.fire({
                    icon: "error",
                    title: "Delete failed",
                    text:
                        error.response?.data?.message ||
                        error.message ||
                        "Something went wrong while deleting.",
                });
            }
        }
    };


    if (loading) {
        return <LoadingSpinner></LoadingSpinner>;
    }

    return (
        <div className="max-w-6xl mx-auto p-6 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <FaBook className="text-blue-500" /> My Books
            </h1>

            {books.length === 0 ? (
                <p className="text-center text-gray-500 mt-10">
                    You haven’t added any books yet.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {books.map((book) => (
                        <div
                            key={book._id}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                        >
                            <img
                                src={book.coverImage}
                                alt={book.title}
                                className="w-full h-60 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-1">{book.title}</h2>
                                <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
                                <p className="text-sm text-gray-500 mb-1">Genre: {book.genre}</p>
                                <p className="flex items-center text-yellow-500 mb-3">
                                    <FaStar className="mr-1" /> {book.rating || "N/A"}
                                </p>

                                <div className="flex justify-between items-center">
                                    <Link
                                        to={`/books/${book._id}`}
                                        className="text-blue-600 hover:underline font-medium"
                                    >
                                        View Details
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(book._id)}
                                        className="text-red-500 hover:text-red-700"
                                        title="Delete"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBooks;

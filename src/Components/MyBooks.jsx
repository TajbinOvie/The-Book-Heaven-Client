import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { FaStar, FaTrashAlt, FaBook, FaEdit } from "react-icons/fa";
import LoadingSpinner from "./LoadingSpinner";
import { AuthContext } from "../Provider/AuthContext";
import Swal from "sweetalert2";

const MyBooks = () => {
    const { user } = useContext(AuthContext);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            if (!user?.email) return;

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

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                const response = await axios.delete(`http://localhost:3000/books/${id}`);
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
        return <LoadingSpinner />;
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
                <div className="overflow-x-auto bg-white rounded-xl shadow-md">
                    <table className="min-w-full border border-gray-200">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="px-4 py-2 text-left">Cover</th>
                                <th className="px-4 py-2 text-left">Title</th>
                                <th className="px-4 py-2 text-left">Author</th>
                                <th className="px-4 py-2 text-left">Genre</th>
                                <th className="px-4 py-2 text-left">Rating</th>
                                <th className="px-4 py-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book) => (
                                <tr
                                    key={book._id}
                                    className="border-t hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-4 py-3">
                                        <img
                                            src={book.coverImage}
                                            alt={book.title}
                                            className="w-16 h-20 object-cover rounded-md"
                                        />
                                    </td>
                                    <td className="px-4 py-3 font-medium text-gray-800">
                                        {book.title}
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">{book.author}</td>
                                    <td className="px-4 py-3 text-gray-600">{book.genre}</td>
                                    <td className="px-4 py-3 text-yellow-500 flex items-center gap-1">
                                        <FaStar /> {book.rating || "N/A"}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <div className="flex items-center justify-center gap-3">
                                            <Link
                                                to={`/books/${book._id}`}
                                                className="text-blue-600 hover:text-blue-800"
                                                title="View Details"
                                            >
                                                View Details
                                            </Link>
                                            <Link
                                                to={`/update-book/${book._id}`}
                                                className="text-green-600 hover:text-green-800"
                                                title="Edit"
                                            >
                                                <span>Edit</span><FaEdit />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(book._id)}
                                                className="text-red-500 hover:text-red-700"
                                                title="Delete"
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyBooks;


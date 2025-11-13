import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { FaStar, FaTrashAlt, FaEdit, FaBook } from "react-icons/fa";
import LoadingSpinner from "./LoadingSpinner";
import { AuthContext } from "../Provider/AuthContext";
import Swal from "sweetalert2";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const MyBooks = () => {
    const { user } = useContext(AuthContext);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        const fetchBooks = async () => {
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
                await axios.delete(`http://localhost:3000/books/${id}`);
                setBooks((prev) => prev.filter((book) => book._id !== id));

                Swal.fire({
                    title: "Deleted!",
                    text: "The book has been deleted successfully.",
                    icon: "success",
                });
            } catch (error) {
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

    if (loading) return <LoadingSpinner />;

    return (
        <div className="min-h-screen py-10 px-6 bg-base-200 dark:bg-gray-900 text-base-content dark:text-gray-200">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-center text-indigo-600 dark:text-indigo-400 mb-10 flex items-center justify-center gap-2">
                    <FaBook className="text-blue-500 dark:text-blue-400" /> My Books
                </h2>

                {books.length === 0 ? (
                    <div className="text-center text-gray-500 dark:text-gray-400 mt-20">
                        <p>You haven’t added any books yet.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-base-100 dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                            <thead className="bg-indigo-100 dark:bg-indigo-900 text-left">
                                <tr>
                                    <th className="px-4 py-3 border-b border-gray-300 dark:border-gray-700">#</th>
                                    <th className="px-4 py-3 border-b border-gray-300 dark:border-gray-700">Cover</th>
                                    <th className="px-4 py-3 border-b border-gray-300 dark:border-gray-700">Title</th>
                                    <th className="px-4 py-3 border-b border-gray-300 dark:border-gray-700">Author</th>
                                    <th className="px-4 py-3 border-b border-gray-300 dark:border-gray-700">Genre</th>
                                    <th className="px-4 py-3 border-b border-gray-300 dark:border-gray-700">Rating</th>
                                    <th className="px-4 py-3 border-b border-gray-300 dark:border-gray-700 text-center">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {books.map((book, index) => (
                                    <tr
                                        key={book._id}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b last:border-none"
                                    >
                                        <td className="px-4 py-3">{index + 1}</td>

                                        <td className="px-4 py-3">
                                            <img
                                                src={book.coverImage || "https://via.placeholder.com/60x90?text=No+Image"}
                                                alt={book.title}
                                                className="w-12 h-16 object-cover rounded"
                                            />
                                        </td>

                                        <td className="px-4 py-3 font-medium truncate max-w-[200px]">
                                            {book.title}
                                        </td>

                                        <td className="px-4 py-3">{book.author}</td>
                                        <td className="px-4 py-3">{book.genre || "N/A"}</td>

                                        <td className="px-4 py-3">
                                            <span className="inline-flex items-center gap-1 text-yellow-500">
                                                <FaStar />
                                                <span>{book.rating || "N/A"}</span>
                                            </span>
                                        </td>

                                        <td className="px-4 py-3 text-center">
                                            <div className="flex items-center justify-center gap-4">
                                                {/* View */}
                                                <Link
                                                    to={`/books/${book._id}`}
                                                    id={`view-${book._id}`}
                                                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-medium"
                                                >
                                                    View
                                                </Link>
                                                <Tooltip
                                                    anchorSelect={`#view-${book._id}`}
                                                    content="View Book Details"
                                                    className="bg-blue-700 text-white text-sm z-[9999]"
                                                />

                                                {/* Update */}
                                                <Link
                                                    to={`/update-book/${book._id}`}
                                                    id={`edit-${book._id}`}
                                                    className="flex items-center gap-1 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200"
                                                >
                                                    <FaEdit /> Update
                                                </Link>
                                                <Tooltip
                                                    anchorSelect={`#edit-${book._id}`}
                                                    content="Update this Book"
                                                    className="bg-green-700 text-white text-sm z-[9999]"
                                                />

                                                {/* Delete */}
                                                <button
                                                    id={`delete-${book._id}`}
                                                    onClick={() => handleDelete(book._id)}
                                                    className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-600"
                                                >
                                                    <FaTrashAlt />
                                                </button>
                                                <Tooltip
                                                    anchorSelect={`#delete-${book._id}`}
                                                    content="Delete this Book"
                                                    className="bg-red-700 text-white text-sm z-[9999]"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBooks;

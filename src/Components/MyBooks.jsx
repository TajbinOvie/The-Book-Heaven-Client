import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { FaStar, FaTrashAlt, FaEdit, FaBook } from "react-icons/fa";
import LoadingSpinner from "./LoadingSpinner";
import { AuthContext } from "../Provider/AuthContext";
import Swal from "sweetalert2";

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
        <div className="min-h-screen  py-10 px-6">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-center text-indigo-600 mb-10 flex items-center justify-center gap-2">
                    <FaBook className="text-blue-500" /> My Books
                </h2>

                {books.length === 0 ? (
                    <div className="text-center text-gray-500 mt-20">
                        <p>You haven’t added any books yet.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded-lg shadow-md border border-gray-200">
                            <thead className="bg-indigo-100 text-left">
                                <tr>
                                    <th className="px-4 py-3 border-b">#</th>
                                    <th className="px-4 py-3 border-b">Cover</th>
                                    <th className="px-4 py-3 border-b">Title</th>
                                    <th className="px-4 py-3 border-b">Author</th>
                                    <th className="px-4 py-3 border-b">Genre</th>
                                    <th className="px-4 py-3 border-b">Rating</th>
                                    <th className="px-4 py-3 border-b text-center">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {books.map((book, index) => (
                                    <tr
                                        key={book._id}
                                        className="hover:bg-gray-50 transition border-b last:border-none"
                                    >
                                        <td className="px-4 py-3">{index + 1}</td>

                                        <td className="px-4 py-3">
                                            <img
                                                src={
                                                    book.coverImage ||
                                                    "https://via.placeholder.com/60x90?text=No+Image"
                                                }
                                                alt={book.title}
                                                className="w-12 h-16 object-cover rounded"
                                            />
                                        </td>

                                        <td className="px-4 py-3 font-medium text-gray-800 truncate max-w-[200px]">
                                            {book.title}
                                        </td>

                                        <td className="px-4 py-3 text-gray-600">{book.author}</td>
                                        <td className="px-4 py-3 text-gray-600">{book.genre}</td>

                                        <td className="px-4 py-3 text-gray-600">
                                            <span className="inline-flex items-center gap-1">
                                                <FaStar className="text-yellow-400" />
                                                <span>{book.rating || "N/A"}</span>
                                            </span>
                                        </td>

                                        <td className="px-4 py-3 text-center">
                                            <div className="flex items-center justify-center gap-4">
                                                <Link
                                                    to={`/books/${book._id}`}
                                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                                >
                                                    View
                                                </Link>

                                                <Link
                                                    to={`/update-book/${book._id}`}
                                                    className="flex items-center gap-1 text-green-600 hover:text-green-800"
                                                >
                                                    <FaEdit /> Update
                                                </Link>

                                                <button
                                                    onClick={() => handleDelete(book._id)}
                                                    className="text-red-500 hover:text-red-700"
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
        </div>
    );
};

export default MyBooks;



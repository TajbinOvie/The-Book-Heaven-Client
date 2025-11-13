import React from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const AddBook = () => {
    const navigate = useNavigate();

    const handleAddBook = (e) => {
        e.preventDefault();

        const formData = {
            title: e.target.title.value,
            author: e.target.author.value,
            genre: e.target.genre.value,
            rating: e.target.rating.value,
            summary: e.target.summary.value,
            coverImage: e.target.coverImage.value,
            userEmail: e.target.userEmail.value,
            userName: e.target.userName.value,
        };

        fetch('http://localhost:3000/books', {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                Swal.fire("✅ Book added successfully!");
                e.target.reset();
                navigate("/my-books"); 
            })
            .catch(err => {
                console.error(err);
                Swal.fire("❌ Something went wrong!");
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-base-200 dark:bg-gray-900 text-base-content dark:text-gray-200">
            <title>Add book</title>
            <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-center text-indigo-600 dark:text-indigo-400 mb-6">
                    Add a New Book
                </h2>

                <form onSubmit={handleAddBook} className="space-y-5">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Book Title"
                            className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                            required
                        />
                    </div>

                    {/* Author */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Author
                        </label>
                        <input
                            type="text"
                            name="author"
                            placeholder="Author Name"
                            className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                            required
                        />
                    </div>

                    {/* Genre */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Genre
                        </label>
                        <input
                            name="genre"
                            type="text"
                            placeholder="Genre"
                            className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                            required
                        />
                    </div>

                    {/* Rating */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Rating
                        </label>
                        <input
                            type="number"
                            name="rating"
                            min="0"
                            max="5"
                            step="0.1"
                            placeholder="Rating (0-5)"
                            className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                            required
                        />
                    </div>

                    {/* Summary */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Summary
                        </label>
                        <textarea
                            name="summary"
                            placeholder="Write a brief summary..."
                            className="textarea textarea-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                            rows={4}
                            required
                        ></textarea>
                    </div>

                    {/* Cover Image */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Cover Image URL
                        </label>
                        <input
                            type="text"
                            name="coverImage"
                            placeholder="Image URL"
                            className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                            required
                        />
                    </div>

                    {/* User Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Your Name
                        </label>
                        <input
                            type="text"
                            name="userName"
                            placeholder="Your Name"
                            className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                            required
                        />
                    </div>

                    {/* User Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Your Email
                        </label>
                        <input
                            type="email"
                            name="userEmail"
                            placeholder="Your Email"
                            className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full btn bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg mt-3"
                    >
                        Add Book
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBook;


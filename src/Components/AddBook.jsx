import React, { useState } from "react";
import Swal from "sweetalert2";

const AddBook = () => {
    // const [showPreview, setShowPreview] = useState(false);

    const handleAddBook = (e) => {
        e.preventDefault()

        const formData = {
            title: e.target.title.value,
            author: e.target.author.value,
            genre: e.target.genre.value,
            rating: e.target.rating.value,
            summary: e.target.summary.value,
            coverImage: e.target.coverImage.value,
            userEmail: e.target.userEmail.value
        }

        fetch('http://localhost:3000/books', {
            method: 'POST',
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            Swal.fire("Successfully logged in!");
        })
        .catch(err => {
            console.log(err)
            Swal.fire(e.message);
        })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
                    Add a New Book
                </h2>

                <form onSubmit={handleAddBook} className="space-y-5">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Book Title"
                            className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                    </div>

                    {/* Author */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Author
                        </label>
                        <input
                            type="text"
                            name="author"
                            placeholder="Author Name"
                            className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                    </div>

                    {/* Genre */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Genre
                        </label>
                        <input
                            name="genre"
                            type="text"
                            placeholder="Genre"
                            className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                    </div>

                    {/* Rating */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Rating
                        </label>
                        <input
                            type="number"
                            name="rating"
                            min="0"
                            max="5"
                            step="0.1"
                            placeholder="Rating (0-5)"
                            className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                    </div>

                    {/* Summary */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Summary
                        </label>
                        <textarea
                            name="summary"
                            placeholder="Write a brief summary..."
                            className="textarea textarea-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            rows={4}
                            required
                        ></textarea>
                    </div>

                    {/* Cover Image */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Cover Image URL
                        </label>
                        <input
                            type="text"
                            name="coverImage"
                            placeholder="Image URL"
                            className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                    </div>

                    {/* User Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Your Email
                        </label>
                        <input
                            type="email"
                            name="userEmail"
                            placeholder="Your Email"
                            className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
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

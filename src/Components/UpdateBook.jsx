import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLoaderData } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import LoadingSpinner from "./LoadingSpinner";

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = useLoaderData();
  const book = data?.result || data;
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize formData from loader data
  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || "",
        author: book.author || "",
        genre: book.genre || "",
        rating: book.rating || "",
        coverImage: book.coverImage || "",
        summary: book.summary || "",
      });
      setLoading(false);
    }
  }, [book]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission with Axios
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`http://localhost:3000/books/${id}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data.modifiedCount > 0 || res.data.success) {
        await Swal.fire({
          icon: "success",
          title: "Book Updated!",
          text: "Your book information has been successfully updated.",
        });
        navigate("/my-books");
      } else {
        Swal.fire({
          icon: "info",
          title: "No Changes",
          text: "You didn’t make any changes to the book.",
        });
      }
    } catch (error) {
      console.error("Error updating book:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.response?.data?.message || "Something went wrong!",
      });
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!formData)
    return <p className="text-center text-gray-500 mt-10">Book not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Update Book
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Author */}
        <div>
          <label className="block font-medium mb-1">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Genre */}
        <div>
          <label className="block font-medium mb-1">Genre</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block font-medium mb-1">Rating</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            min="0"
            max="5"
            step="0.1"
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block font-medium mb-1">Cover Image URL</label>
          <input
            type="text"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-300"
          />
          {formData.coverImage && (
            <img
              src={formData.coverImage}
              alt="Book Cover"
              className="w-32 mt-2 rounded-md shadow-sm"
            />
          )}
        </div>

        {/* Summary */}
        <div>
          <label className="block font-medium mb-1">Summary</label>
          <textarea
            name="summary"
            value={formData.summary}
            rows="4"
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-300"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Update Book
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;





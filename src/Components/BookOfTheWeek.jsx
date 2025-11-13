import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import { motion } from "framer-motion";
import { Link } from "react-router";

const BookOfTheWeek = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get("http://localhost:3000/books");
        const books = res.data;

        // Pick the first book with rating >= 4.9
        const featuredBook = books.find((b) => b.rating >= 4.9);

        setBook(featuredBook || books[0]); // fallback to first book if none found
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, []);

  if (loading) return <LoadingSpinner />;

  if (!book)
    return <p className="text-center text-gray-500 mt-10">No featured book found.</p>;

  return (
    <section className="py-10">
      <div>
        <h1 className="text-4xl text-center font-bold text-blue-600 pb-2">Book Of The Week</h1>
      </div>
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-10 p-6 rounded-xl shadow-lg bg-gray-50">
        {/* Book Image */}
        <motion.img
          src={book.coverImage}
          alt={book.title}
          className="w-full md:w-1/3 h-72 object-cover rounded-xl shadow-md"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        />

        {/* Book Info */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-indigo-600 mb-2">{book.title}</h2>
          <p className="text-gray-600 text-lg mb-1">by {book.author}</p>
          <p className="text-yellow-500 font-semibold mb-3">
            ⭐ {book.rating} / 5
          </p>
          <p className="text-gray-700 mb-4">{book.summary || "No description available."}</p>
          <Link to={`/books/${book._id}`}  className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition">
          View Details
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BookOfTheWeek;

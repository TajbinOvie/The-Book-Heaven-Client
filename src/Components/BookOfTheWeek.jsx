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

        const featuredBook = books.find((b) => b.rating >= 4.9);

        setBook(featuredBook || books[0]); 
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
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
        No featured book found.
      </p>
    );

  return (
    <section className="py-16 px-6 md:px-10">
      <h1 className="text-4xl text-center font-bold text-blue-600 dark:text-blue-400 mb-10">
        Book of the Week
      </h1>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Book Image */}
        <motion.img
          src={book.coverImage}
          alt={book.title}
          className="w-full md:w-1/3 h-[400px] md:h-[500px] object-contain rounded-lg shadow-md"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        />

        {/* Book Info */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
            {book.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-1">
            by {book.author}
          </p>
          <p className="text-yellow-500 font-semibold mb-3">
            ⭐ {book.rating} / 5
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            {book.summary || "No description available."}
          </p>
          <Link
            to={`/books/${book._id}`}
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BookOfTheWeek;




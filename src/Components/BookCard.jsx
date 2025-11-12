import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Link } from "react-router";

const BookCard = ({ book }) => {
  return (
    <motion.div
      className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="relative">
        <img
          src={book?.coverImage || "https://via.placeholder.com/400x300?text=No+Image"}
          alt={book?.title || "Book Cover"}
          className="w-full h-48 object-cover"
        />
        {book?.isNew && (
          <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            New
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{book?.title}</h3>
        <p className="text-sm text-gray-500 mt-1">By {book?.author || "Unknown"}</p>

        <div className="flex items-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          ))}
          <span className="text-sm text-gray-600 ml-1">(4.9)</span>
        </div>

        <p className="text-gray-700 text-sm mt-3 line-clamp-2">
          {book?.description ||
            "No description available for this book at the moment."}
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-semibold text-blue-600">
            ${book?.price || "Free"}
          </span>
          <Link to={`/books/${book._id}`} className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;


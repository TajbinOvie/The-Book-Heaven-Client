import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Link } from "react-router";

const BookCard = ({ book }) => {
  return (
    <motion.div
      className="group relative border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden rounded-md transition-all duration-500 h-96"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Book Cover */}
      <div className="relative h-72 w-full overflow-hidden rounded-t-md">
  <img
    src={book?.coverImage || 'https://via.placeholder.com/300x400?text=No+Image'}
    alt={book?.title || 'Book Cover'}
    className="w-full h-full object-contain" // object-contain ensures full image is visible
  />
</div>


      {/* White Overlay (slides up on hover) */}
      <div className="absolute inset-x-0 bottom-0 bg-white dark:bg-gray-800 translate-y-[30%] group-hover:translate-y-0 transition-transform duration-500 p-4 flex flex-col justify-between">
        <div>
          <p className="text-xs text-rose-600 font-semibold uppercase tracking-wide mb-1">
            {book?.genre || 'Paperback'}
          </p>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 leading-snug mb-1">
            {book?.title || 'Untitled Book'}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">
            {book?.author || 'Unknown Author'}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.round(book?.rating || 0)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
            {book?.rating && (
              <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">
                ({book.rating})
              </span>
            )}
          </div>
        </div>

        {/* Hidden button appears on hover */}
        <Link
          to={`/books/${book._id}`}
          className="opacity-0 group-hover:opacity-100 mt-3 inline-block bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-blue-700 transition-opacity duration-300 text-center"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default BookCard;





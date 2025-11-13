import React, { useEffect, useState } from "react";
import axios from "axios";

const TopRatedBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("https://the-book-heaven-server.vercel.app/top-rated")
      .then(res => setBooks(res.data))
      .catch(err => console.log(err));
  }, []);

  if (!books.length) return null;

  return (
    <div className="w-full py-10 bg-gray-100 dark:bg-gray-800 flex flex-col items-center">
      
      {/* Heading - separate div */}
      <div className="mb-6">
        <h2 className="text-4xl font-bold text-center text-[#4F39F6]">
          Top Rated Books
        </h2>
      </div>

      {/* Centered narrower marquee container */}
      <div className="relative w-[80%] max-w-3xl overflow-hidden">
        <div className="flex gap-6 animate-carousel">
          {[...books, ...books].map((book, index) => (
            <div
              key={index}
              className="w-64 h-80 rounded-md shadow-md p-4 bg-white dark:bg-gray-700 flex-shrink-0 transition-transform duration-500"
            >
              <img
                src={book.coverImage || "https://via.placeholder.com/150x200"}
                alt={book.title}
                className="w-full h-48 object-cover rounded-md mb-2"
              />
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-300">{book.author}</p>
              <p className="text-yellow-400 font-semibold">Rating: {book.rating}</p>
            </div>
          ))}
        </div>

        {/* Fade overlays */}
        <div className="pointer-events-none absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-gray-100 dark:from-gray-800 to-transparent"></div>
        <div className="pointer-events-none absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-gray-100 dark:from-gray-800 to-transparent"></div>
      </div>

      <style jsx>{`
        .animate-carousel {
          display: flex;
          gap: 1.5rem;
          animation: scroll 15s linear infinite;
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default TopRatedBooks;


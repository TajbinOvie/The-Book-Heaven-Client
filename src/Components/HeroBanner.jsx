import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import sliderBg from "../assets/bg-image.png"; // import your image
import { Link } from "react-router";

const HeroBanner = () => {
  const [books, setBooks] = useState([]);
  const [index, setIndex] = useState(0);

  // Fetch books once
  useEffect(() => {
    axios.get("http://localhost:3000/books")
      .then(res => {
        const shuffled = res.data.sort(() => 0.5 - Math.random()).slice(0, 3);
        setBooks(shuffled);
      })
      .catch(err => console.error("Error loading books:", err));
  }, []);

  // Auto slide every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (books.length === 0) return null;
  const current = books[index];

  return (
    <div
      className="relative w-full h-[75vh] overflow-hidden flex items-center justify-center"
      style={{
        backgroundImage: `url(${sliderBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-black/15 dark:bg-black/20"></div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current._id}
          className="absolute inset-0 flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-6 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Text Section */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              {current.title || "Untitled Book"}
            </h1>
            <p className="text-gray-100 mt-4 text-base md:text-lg line-clamp-3">
              {current.summary || "A wonderful story waiting to be explored."}
            </p>
            <div className="flex gap-4 mt-6">
              <Link to={"/books"} className="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow hover:bg-indigo-700 transition">
                All Books
              </Link>
              <Link to={"/add-book"}  className="border border-white text-white px-5 py-2 rounded-lg hover:bg-white hover:text-indigo-700 transition">
                Create Book
              </Link>
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="w-full md:w-1/2 flex justify-center md:justify-end mt-8 md:mt-0"
            initial={{ x: 120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <img
              src={current.coverImage || "https://via.placeholder.com/500x700?text=No+Image"}
              alt={current.title}
              className="w-64 md:w-80 h-auto object-contain rounded-xl shadow-lg"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Slider dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {books.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all ${i === index
                ? "bg-indigo-600 w-6"
                : "bg-indigo-300"
              }`}
          ></button>
        ))}
      </div>
    </div>

  );
};

export default HeroBanner;

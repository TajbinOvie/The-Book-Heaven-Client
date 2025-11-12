import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const HeroBanner = () => {
    const [books, setBooks] = useState([]);
    const [index, setIndex] = useState(0);

    // Fetch books once
    useEffect(() => {
        axios.get("http://localhost:3000/books")
            .then(res => {
                // Pick 3 random books
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
        <div className="relative w-full h-[75vh] overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current._id}
                    className="absolute inset-0 flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Text Section */}
                    <motion.div
                        className="w-full md:w-1/2 z-10"
                        initial={{ y: -80, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-indigo-700 leading-tight">
                            {current.title || "Untitled Book"}
                        </h1>
                        <p className="text-gray-600 mt-4 text-base md:text-lg line-clamp-3">
                            {current.description || "A wonderful story waiting to be explored."}
                        </p>
                        <div className="flex gap-4 mt-6">
                            <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow hover:bg-indigo-700 transition">
                                All Books
                            </button>
                            <button className="border border-indigo-600 text-indigo-600 px-5 py-2 rounded-lg hover:bg-indigo-600 hover:text-white transition">
                                Create Book
                            </button>
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
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {books.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`w-3 h-3 rounded-full transition-all ${i === index ? "bg-indigo-600 w-6" : "bg-indigo-300"
                            }`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default HeroBanner;

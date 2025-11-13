import React from "react";
import { motion } from "framer-motion";

const genres = [
    { name: "Fantasy", image: "https://source.unsplash.com/400x300/?fantasy" },
    { name: "Science Fiction", image: "https://source.unsplash.com/400x300/?scifi" },
    { name: "Romance", image: "https://source.unsplash.com/400x300/?romance" },
    { name: "Mystery", image: "https://source.unsplash.com/400x300/?mystery" },
];

const TopGenre = () => {
    return (
        <section className="py-10">
            <h2 className="text-4xl font-bold text-indigo-600 text-center mb-8">
                Top Genres
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {genres.map((genre, index) => (
                    <motion.div
                        key={index}
                        className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer"
                        whileHover={{ scale: 1.08 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <img
                            src={genre.image}
                            alt={genre.name}
                            className="w-full h-40 object-cover"
                        />
                        <div className="p-2 text-center">
                            <h3 className="text-lg font-semibold">{genre.name}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default TopGenre;


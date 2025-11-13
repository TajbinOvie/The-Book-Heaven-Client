import React from "react";
import { motion } from "framer-motion";

const genres = [
    { name: "Fantasy", image: "https://i.ibb.co.com/N2mWpgGh/71wz-X0-Khwm-L-AC-UF1000-1000-QL80.jpg" },
    { name: "Science Fiction", image: "https://i.ibb.co.com/SwqGPjnq/220577745.jpg" },
    { name: "Romance", image: "https://i.ibb.co.com/BRkndG6/81-SEXp-Iuqs-L-UF894-1000-QL80.jpg" },
    { name: "History", image: "https://i.ibb.co.com/nMKPNGQh/empireofashes-med.jpg" },
];

const TopGenre = () => {
    return (
        <section className="py-10">
            <h2 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 text-center mb-8">
                Top Genres
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {genres.map((genre, index) => (
                    <motion.div
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-700 overflow-hidden cursor-pointer"
                        whileHover={{ scale: 1.08 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <img
                            src={genre.image}
                            alt={genre.name}
                            className="w-full h-40 object-cover"
                        />
                        <div className="p-2 text-center">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                {genre.name}
                            </h3>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default TopGenre;



import React, { useEffect, useState } from "react";

const TopGenre = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/top-genres") // your API endpoint
      .then(res => res.json())
      .then(data => setGenres(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="py-10 bg-gray-100 dark:bg-gray-800">
      <h2 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 text-center mb-8">
        Top Genres
      </h2>

      {/* Marquee container */}
      <div className="relative w-[80%] max-w-5xl mx-auto overflow-hidden h-24">
        <div className="flex gap-6 animate-marquee">
          {[...genres, ...genres].map((genre, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-white dark:bg-gray-700 rounded-xl shadow-md dark:shadow-gray-700 p-2 flex-shrink-0 cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              <img
                src={genre.coverImage || "/placeholder.jpg"} // fallback
                alt={genre.genre}
                className="w-16 h-16 object-cover rounded-md"
              />
              <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {genre.genre}
              </span>
            </div>
          ))}
        </div>

        {/* Fade overlays */}
        <div className="pointer-events-none absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-gray-100 dark:from-gray-800 to-transparent"></div>
        <div className="pointer-events-none absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-gray-100 dark:from-gray-800 to-transparent"></div>
      </div>

      <style jsx>{`
        .animate-marquee {
          display: flex;
          gap: 1.5rem;
          animation: scroll 20s linear infinite;
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default TopGenre;





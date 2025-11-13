import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';
import { Link } from 'react-router';
import { FaStar } from 'react-icons/fa';

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('desc'); // default: highest to lowest

  useEffect(() => {
    axios.get('http://localhost:3000/books')
      .then(res => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading books:', err);
        setLoading(false);
      });
  }, []);

  // Sort books based on rating
  const sortedBooks = [...books].sort((a, b) => {
    const ratingA = parseFloat(a.rating) || 0;
    const ratingB = parseFloat(b.rating) || 0;
    return sortOrder === 'asc' ? ratingA - ratingB : ratingB - ratingA;
  });

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen py-10 px-6 bg-base-200 dark:bg-gray-900 text-base-content dark:text-gray-200">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-10 gap-4">
          <h2 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 text-center md:text-left">
            All Books
          </h2>

          {/* Sort Dropdown */}
          <div className="flex items-center justify-center gap-2 whitespace-nowrap">
            <label htmlFor="sort" className="font-medium text-gray-700 dark:text-gray-300 mb-0">
              Sort by Rating:
            </label>
            <select
              id="sort"
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="desc">Highest → Lowest</option>
              <option value="asc">Lowest → Highest</option>
            </select>
          </div>
        </div>

        {/* Table Section */}
        {books.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-20">
            <p>No books found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-base-100 dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <thead className="bg-indigo-100 dark:bg-indigo-900 text-left">
                <tr>
                  <th className="px-4 py-3 border-b border-gray-300 dark:border-gray-700">#</th>
                  <th className="px-4 py-3 border-b border-gray-300 dark:border-gray-700">Cover</th>
                  <th className="px-4 py-3 border-b border-gray-300 dark:border-gray-700">Title</th>
                  <th className="px-4 py-3 border-b border-gray-300 dark:border-gray-700">Author</th>
                  <th className="px-4 py-3 border-b border-gray-300 dark:border-gray-700">Genre</th>
                  <th className="px-4 py-3 border-b border-gray-300 dark:border-gray-700">Rating</th>
                  <th className="px-4 py-3 border-b border-gray-300 dark:border-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedBooks.map((book, index) => (
                  <tr key={book._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-4 py-3 border-b border-gray-300 dark:border-gray-700">{index + 1}</td>
                    <td className="px-4 py-3 border-b border-gray-300 dark:border-gray-700">
                      <img
                        src={book.coverImage || "https://via.placeholder.com/60x90?text=No+Image"}
                        alt={book.title}
                        className="w-12 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-3 border-b border-gray-300 dark:border-gray-700 font-medium">{book.title}</td>
                    <td className="px-4 py-3 border-b border-gray-300 dark:border-gray-700">{book.author}</td>
                    <td className="px-4 py-3 border-b border-gray-300 dark:border-gray-700">{book.genre || "N/A"}</td>
                    <td className="px-4 py-3 border-b border-gray-300 dark:border-gray-700">
                      <span className="inline-flex items-center gap-1">
                        <FaStar className="text-yellow-400" />
                        <span>{book.rating || "N/A"}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3 border-b border-gray-300 dark:border-gray-700">
                      <Link
                        to={`/books/${book._id}`}
                        className="px-3 py-1 bg-blue-600 dark:bg-blue-500 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBooks;







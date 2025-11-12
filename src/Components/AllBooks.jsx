import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';
import { Link } from 'react-router';
import { FaStar } from 'react-icons/fa';

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-indigo-600 mb-10">
          📚 All Books
        </h2>

        {books.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <p>No books found 😔</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md border border-gray-200">
              <thead className="bg-indigo-100 text-left">
                <tr>
                  <th className="px-4 py-3 border-b">#</th>
                  <th className="px-4 py-3 border-b">Cover</th>
                  <th className="px-4 py-3 border-b">Title</th>
                  <th className="px-4 py-3 border-b">Author</th>
                  <th className="px-4 py-3 border-b">Genre</th>
                  <th className="px-4 py-3 border-b">Rating</th>
                  <th className="px-4 py-3 border-b">Price</th>
                  <th className="px-4 py-3 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, index) => (
                  <tr key={book._id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 border-b">{index + 1}</td>
                    <td className="px-4 py-3 border-b">
                      <img
                        src={book.coverImage || "https://via.placeholder.com/60x90?text=No+Image"}
                        alt={book.title}
                        className="w-12 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-3 border-b font-medium">{book.title}</td>
                    <td className="px-4 py-3 border-b">{book.author}</td>
                    <td className="px-4 py-3 border-b">{book.genre || "N/A"}</td>
                    <td className="px-4 py-3 border-b">
                      <span className="inline-flex items-center gap-1">
                        <FaStar className="text-yellow-400" style={{ verticalAlign: "middle" }} />
                        <span className="align-middle">{book.rating || "N/A"}</span>
                      </span>
                    </td>

                    <td className="px-4 py-3 border-b">${book.price || "Free"}</td>
                    <td className="px-4 py-3 border-b">
                      <Link
                        to={`/books/${book._id}`}
                        className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
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



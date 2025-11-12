import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';
import BookCard from './BookCard';


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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-indigo-600 mb-10">
          📚 All Books
        </h2>

        {books.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <p>No books found 😔</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <BookCard book={book}></BookCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBooks;


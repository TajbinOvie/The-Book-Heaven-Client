import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import LoadingSpinner from "./LoadingSpinner";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/books/${id}`)
      .then(res => setBook(res.data.result))
      .catch(err => console.error("Error fetching book:", err));
  }, [id]);

  if (!book) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Book Header */}
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full md:w-1/3 h-full object-cover rounded-xl shadow-lg"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <p className="text-gray-600 text-lg mb-1">
            By <span className="font-medium">{book.author}</span>
          </p>
          {book.genre && <p className="text-gray-500 mb-1">Genre: {book.genre}</p>}
          {book.publishedDate && <p className="text-gray-500 mb-1">Published: {book.publishedDate}</p>}
          {book.publisher && <p className="text-gray-500 mb-1">Publisher: {book.publisher}</p>}
          {book.pages && <p className="text-gray-500 mb-1">Pages: {book.pages}</p>}
          {book.language && <p className="text-gray-500 mb-1">Language: {book.language}</p>}
          {book.rating && (
            <p className="text-yellow-500 font-semibold mb-3">
              Rating: {book.rating} / 5 ⭐
            </p>
          )}
          <p className="text-gray-700 mt-4">{book.summary}</p>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-6 border-gray-300" />

      {/* Extra Details / Call to Action (optional) */}
      <div className="flex flex-wrap gap-4 mt-4">
        {book.isBestseller && <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">Bestseller</span>}
        {book.isNew && <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">New Arrival</span>}
      </div>
    </div>
  );
};

export default BookDetails;


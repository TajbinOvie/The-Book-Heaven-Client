import React, { useEffect, useState } from 'react';
import HeroBanner from '../Components/HeroBanner';
import LatestBooks from '../Components/LatestBooks';
import axios from 'axios';
import LoadingSpinner from '../Components/LoadingSpinner';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [latestBooks, setLatestBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Fetch latest 3 books for HeroBanner
        const heroRes = await axios.get('http://localhost:3000/books');
        setBooks(heroRes.data);

        // Fetch latest 6 books for LatestBooks section
        const latestRes = await axios.get('http://localhost:3000/latest-books');
        setLatestBooks(latestRes.data);

        setLoading(false);
      } catch (err) {
        console.error('Error loading books:', err);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <HeroBanner books={books} />
      <LatestBooks latestBooks={latestBooks} />
    </div>
  );
};

export default Home;

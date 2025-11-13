import React, { useEffect, useState } from 'react';
import HeroBanner from '../Components/HeroBanner';
import LatestBooks from '../Components/LatestBooks';
import axios from 'axios';
import LoadingSpinner from '../Components/LoadingSpinner';
import TopGenre from '../Components/TopGenre';
import BookOfTheWeek from '../Components/BookOfTheWeek';
import TopRatedBooks from '../Components/TopRatedThree';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [latestBooks, setLatestBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Fetch latest 3 books for HeroBanner
        const heroRes = await axios.get('https://the-book-heaven-server.vercel.app/books');
        setBooks(heroRes.data);

        // Fetch latest 6 books for LatestBooks section
        const latestRes = await axios.get('https://the-book-heaven-server.vercel.app/latest-books');
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
      <TopGenre></TopGenre>
      <BookOfTheWeek></BookOfTheWeek>
      <TopRatedBooks></TopRatedBooks>
    </div>
  );
};

export default Home;

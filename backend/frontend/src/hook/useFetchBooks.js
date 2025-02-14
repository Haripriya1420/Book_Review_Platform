// src/hooks/useFetchBooks.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/books') // Backend API URL
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch books');
        setLoading(false);
      });
  }, []);

  return { books, loading, error };
};

export default useFetchBooks;

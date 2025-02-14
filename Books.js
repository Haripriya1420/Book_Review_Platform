import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/books")
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching books.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h2>Books</h2>
      {books.length === 0 ? (
        <p>No books available at the moment.</p>
      ) : (
        books.map((book) => (
          <div key={book._id}>
            <Link to={`/books/${book._id}`}>{book.title}</Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Books;

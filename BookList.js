import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
<li key={book._id}>
  <Link to={`/books/${book._id}`}>
    <h3>{book.title}</h3>
  </Link>
  <p>{book.author}</p>
  <p>{book.description}</p>
</li>

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching data from the backend API
  useEffect(() => {
    fetch('http://localhost:5000/books') 
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch books');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Book List</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>{book.description}</p>
          </li>
        ))}
      </ul>
    </div>
    
  );
};

export default BookList;

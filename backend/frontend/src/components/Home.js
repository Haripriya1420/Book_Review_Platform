import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const Home = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch featured books when the component loads
  useEffect(() => {
    axios
      .get("http://localhost:5000/featured-books")  // Replace with your backend route
      .then((res) => {
        setFeaturedBooks(res.data);  // Set the fetched books as featured
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching featured books.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading featured books...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <nav>
        <Link to="/">Home</Link> | <Link to="/books">Books</Link>
      </nav>

      <div className="welcome-section">
        <h1>Welcome to the Book Review Platform</h1>
        <Link to="/books">
          <button>Browse Books</button>
        </Link>
      </div>

      <div className="featured-books">
        <h2>Featured Books</h2>
        <div className="books-list">
          {featuredBooks.length === 0 ? (
            <p>No featured books available.</p>
          ) : (
            featuredBooks.map((book) => (
              <div key={book._id} className="book-item">
                <Link to={`/books/${book._id}`}>
                  <img src={book.coverImage} alt={book.title} />
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


const Home = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/featured-books")
      .then((res) => {
        setFeaturedBooks(res.data);
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
      <h1>Featured Books</h1>
      <div className="featured-books">
        {featuredBooks.length === 0 ? (
          <p>No featured books available.</p>
        ) : (
          featuredBooks.map((book) => (
            <div key={book._id}>
              <Link to={`/books/${book._id}`}>
                <img src={book.image} alt={book.title} />
                <h3>{book.title}</h3>
                <p>{book.author}</p>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, useParams } from "react-router-dom";
import axios from "axios";


const Home = () => {
  return (
    <div className="container">
      <h1>Book Review Platform📖
      </h1>
      <Link to="/books">
        <button>Browse Books</button>
      </Link>
    </div>
  );
};

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

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching book details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading book details...</p>;
  if (error) return <p>{error}</p>;
  if (!book) return <p>Book not found.</p>;

  return (
    <div className="container">
      <h2>{book.title}</h2>
      <p>{book.description}</p>
      <div>
        <h3>Reviews</h3>
        {book.reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          book.reviews.map((review, index) => (
            <div key={index}>
              <p><strong>{review.username}</strong>: {review.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/books">Books</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetails />} />
      </Routes>
    </Router>
  );
};

export default App;

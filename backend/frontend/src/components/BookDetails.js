import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

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

export default BookDetails;

const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'harihari01', // Your MySQL root password
  database: 'book_review_platform'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database!');
});

// Sample API endpoint to fetch all books with pagination
app.get('/books', (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  const query = `SELECT * FROM books LIMIT ${limit} OFFSET ${offset}`;
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Sample API endpoint to fetch a specific book
app.get('/books/:id', (req, res) => {
  const bookId = req.params.id;

  const query = 'SELECT * FROM books WHERE id = ?';
  db.query(query, [bookId], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(results[0]);
  });
});

// Sample API endpoint to add a new book (admin only)
app.post('/books', (req, res) => {
  const { title, author, description, genre, published_date } = req.body;

  const query = 'INSERT INTO books (title, author, description, genre, published_date) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [title, author, description, genre, published_date], (err, result) => {
    if (err) throw err;
    res.status(201).json({ message: 'Book added successfully', bookId: result.insertId });
  });
});

// API endpoint to retrieve reviews for a specific book
app.get('/reviews', (req, res) => {
  const bookId = req.query.book_id;
  
  if (!bookId) {
    return res.status(400).json({ message: 'book_id is required' });
  }

  const query = 'SELECT * FROM reviews WHERE book_id = ?';
  db.query(query, [bookId], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// API endpoint to submit a new review
app.post('/reviews', (req, res) => {
  const { book_id, user_id, review, rating } = req.body;

  const query = 'INSERT INTO reviews (book_id, user_id, review, rating) VALUES (?, ?, ?, ?)';
  db.query(query, [book_id, user_id, review, rating], (err, result) => {
    if (err) throw err;
    res.status(201).json({ message: 'Review added successfully', reviewId: result.insertId });
  });
});

// API endpoint to get a user profile
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;

  const query = 'SELECT * FROM users WHERE id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(results[0]);
  });
});

// API endpoint to update a user profile
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const { name, email, password } = req.body;

  const query = 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?';
  db.query(query, [name, email, password, userId], (err, result) => {
    if (err) throw err;
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User updated successfully' });
  });
});

// Start server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});

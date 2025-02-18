const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();  // Load environment variables
const Book = require('./models/Book'); // Import the Book model

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection using environment variable
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Example route
app.get('/', (req, res) => {
  res.send('Welcome to the Book App');
});

// Route to add a book
app.post('/addBook', async (req, res) => {
  try {
    const newBook = new Book({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      year: req.body.year,
    });
    await newBook.save();
    res.status(201).send('Book added successfully');
  } catch (err) {
    res.status(500).send('Error adding book: ' + err.message);
  }
});

// Route to get all books
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).send('Error retrieving books: ' + err.message);
  }
});

// Route to delete a book by ID
app.delete('/deleteBook/:id', async (req, res) => {
  try {
    const bookId = req.params.id;
    const result = await Book.findByIdAndDelete(bookId);
    if (!result) {
      return res.status(404).send('Book not found');
    }
    res.status(200).send('Book deleted successfully');
  } catch (err) {
    res.status(500).send('Error deleting book: ' + err.message);
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

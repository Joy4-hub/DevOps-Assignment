const mongoose = require('mongoose');

// Define the schema for the book model
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],  // Make the title required with a custom message
    },
    author: {
        type: String,
        required: [true, 'Author is required'],  // Make the author required with a custom message
    },
    genre: {
        type: String,
        required: [false, 'Genre is optional'],  // Genre is not required
    },
    year: {
        type: Number,
        required: [false, 'Year is optional'],  // Year is not required
        min: [1900, 'Year must be after 1900'],  // Enforce a year after 1900
        max: [new Date().getFullYear(), 'Year cannot be in the future'],  // Enforce the current year as a maximum value
    }
});

// Create the Book model using the schema
const Book = mongoose.model('Book', bookSchema);

// Export the Book model
module.exports = Book;

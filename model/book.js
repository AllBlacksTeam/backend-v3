var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
    title: String,
    author: String
});

var Book = mongoose.model('Book', bookSchema);

Book.methods

module.exports = Book;
const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: String,
  email: String,
  bio: String,
  createdAt: Date,
  updatedAt: Date,
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;

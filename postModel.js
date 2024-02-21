const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
  },
  createdAt: Date,
  updatedAt: Date,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
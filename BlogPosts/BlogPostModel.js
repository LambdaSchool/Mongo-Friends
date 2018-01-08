const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  contents: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('BlogPost', BlogPostSchema);
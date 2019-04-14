const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  image: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  content: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  creationDate: {
    type: mongoose.Schema.Types.Date,
    default: Date.now
  },
  comments:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Comment',
    required: true
  }]
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

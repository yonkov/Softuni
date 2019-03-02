const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  storyLine: {
    type: String,
    required: true
  },
  trailerUrl: {
    type: String,
    required: true
  },
  poster: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Movie', movieSchema);
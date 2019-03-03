const Movie = require('../models/Movie');

module.exports = {
  getMovies: (req, res) => {
    Movie.find()
      .then((movies) => {
        res
          .status(200)
          .json({ message: 'Fetched movies successfully.', movies });
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      });
  },
  createMovie: (req, res) => {
    const movieObj = req.body;
    Movie.create(movieObj)
    .then((movie) => {
      res.status(200)
        .json({
          message: 'Movie created successfully!',
          movie
        })
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
  }
}
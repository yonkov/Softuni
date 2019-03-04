const Post = require('../models/Post');

module.exports = {
  getposts: (req, res) => {
    Post.find()
      .then((posts) => {
        res
          .status(200)
          .json({ message: 'Fetched posts successfully.', posts });
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      });
  },
  createPost: (req, res) => {
    const PostObj = req.body;
    Post.create(PostObj)
    .then((Post) => {
      res.status(200)
        .json({
          message: 'Post created successfully!',
          Post
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
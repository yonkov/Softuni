const Post = require('../models/Post');

module.exports = {
  getposts: (req, res, next) => {
    const pageSize = parseInt(req.query.pageSize, 10) || 1;
    const pageQuery = parseInt(req.query.page, 10) || 1;

    Post.find()
      .limit(pageSize)
      .skip(pageSize * pageQuery)
      .sort({ creationDate: -1 })
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
  },

  editGet: (req, res) => {
    const id = req.params.id
    Post.findById(id).then((posts) => {
      res
        .status(200)
        .json({ message: 'Fetched post successfully.', posts });
    })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      });
  },

  editPost: (req, res) => {
    const id = req.params.id;
    const { title, imageUrl, content } = req.body;

    Post.findById(id).then((post) => {
      post.title = title;
      post.content = content;
      post.imageUrl = imageUrl;

      return post.save().then(() => {
        res.status(200)
          .json({
            message: "Post edited!",
            post
          })
      })
    })

      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }

      });
  },

}
const Post = require('../models/Post');
const Comment = require('../models/Comment');

module.exports = {
  getposts: (req, res, next) => {

    Post.find()
      .sort({ creationDate: -1 })
      .populate('author', 'username')
      .populate({path:'comments', populate:{path:'author'}})
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
  createPost: (req, res, next) => {
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

  editGet: (req, res, next) => {
    const id = req.params.id
    Post.findById(id)
      .then((post) => {
        res
          .status(200)
          .json({ message: 'Fetched post successfully.', post });
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

    Post.findById(id)
      .then((post) => {
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

  deleteGet: (req, res, next) => {
    const id = req.params.id
    Post.findById(id)
      .then((post) => {
        res
          .status(200)
          .json({ message: 'Fetched post successfully.', post })
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      });
  },

  deletePost: (req, res) => {
    const id = req.params.id;
    Post.findByIdAndDelete(id)
      .then(
        res.status(200)
          .json({
            message: "Post deleted!",
            id
          })
      )
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }

      });
  },

  createComment: async (req, res, next) => {
    try {
      const {comment, userId} = req.body;
      const post = req.body.post._id
      const author = userId
      const content = await Comment.create({comment, post, author});
      res.status(200)
        .json({
          message: 'Comment created successfully!',
          comment
        })
      const postObj = await Post.findById(post);
      postObj.comments.push(content._id)
      await postObj.save();

    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    }
  }

}
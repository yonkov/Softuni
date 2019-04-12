const express = require('express')
const authCheck = require('../middleware/auth-check');
const Post = require('../models/Post');

const router = new express.Router()

function validatePostForm (payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  if (!payload || typeof payload.title !== 'string' || payload.title.length <= 10) {
    isFormValid = false
    errors.title = 'title must be more than 10 symbols.'
  }

  if (!payload || typeof payload.image !== 'string' || payload.image.length === 0) {
    isFormValid = false
    errors.image = 'Image URL is required.'
  }

  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  if (!payload || typeof payload.content !== 'string') {
    isFormValid = false
    errors.content = 'title must be more than 10 symbols.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

router.post('/create', authCheck, (req, res) => {
  const post = req.body
  
  post.author = req.user._id
  const validationResult = validatePostForm(post)
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }
  

  Post.create(post)
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Post added successfully.',
        post
      })
    })
})

router.get('/all', authCheck ,(req, res) => {
  const page = parseInt(req.query.page) || 1
  const search = req.query.search

  Post.find({})
  .sort({ creationDate: -1 })
    .then((Post) => {
      return res.status(200).json(Post)
    })
})

router.get('/details/:id', authCheck, (req, res) => {
  const id = req.params.id
  Post.findById(id)
    .then((Post) => {
      if (!Post) {
        return res.status(404).json({
          success: false,
          message: 'Entry does not exists!'
        })
      }

      let response = {
        id,
        title: Post.title,
        image: Post.image,
        content: Post.content,
      }

      res.status(200).json(response)
    })
})


router.get('/user', authCheck, (req, res) => {
  const user = req.user._id

  Post.find({creator: user})
    .then((Post) => {
      return res.status(200).json(Post)
    })
})

router.delete('/delete/:id', authCheck, (req, res) => {
  const id = req.params.id
  const user = req.user._id
  
  Post.findById(id)
    .then((Post) => {
      if (!Post) {
        return res.status(200).json({
          success: false,
          message: 'Post does not exists!'
        })
      }
      
      if ((!req.user.roles.includes("Admin"))) {
         return res.status(401).json({
           success: false,
           message: 'Unauthorized!'
         })
      }
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }

    });
      
      
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
})

router.put('/edit/:id', authCheck, (req, res) => {
  const id = req.params.id;
  const post = req.body;
  console.log(post);
  

  if (!post) {
    return res.status(404).json({
      success: false,
      message: 'Post does not exists!'
    })
  }

  if (!req.user.roles.includes('Admin')) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized!'
    })
  }

  const validationResult = validatePostForm(post)
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }

  Post.findByIdAndUpdate(id, post)
    .then(() => {
      return res.status(200).json({
        success: true,
        message: 'Post edited successfully!'
      })
  })
})

router.get('/:id', authCheck, (req, res) => {
  const id = req.params.id

  Post.findById(id)
    .then(Post => {
      if (!Post) {
        return res.status(404).json({
          success: false,
          message: 'Entry does not exists!'
        })
      }

      let response = {
        id,
        title: Post.title,
        content: Post.content,
        image: Post.image
      }

      if (Post.material) {
        response.material = Post.material
      }

      res.status(200).json(response)
    })
})

module.exports = router

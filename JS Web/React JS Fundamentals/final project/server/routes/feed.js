const router = require('express').Router();
const feedController = require('../controllers/feed');
const isAuth = require('../middleware/is-auth');

router.get('/posts', feedController.getposts);
router.post('/post/create', feedController.createPost);
router.get('/post/edit/:id', feedController.editGet);
router.post('/post/edit/:id', feedController.editPost);
//router.post('/post/details/:id', feedController.getPostById);
router.get('/post/delete/:id', feedController.deleteGet);
router.post('/post/delete/:id', feedController.deletePost);

module.exports = router;
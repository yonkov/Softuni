const router = require('express').Router();
const feedController = require('../controllers/feed');
const isAuth = require('../middleware/is-auth');

router.get('/posts', feedController.getposts);
router.post('/post/create', feedController.createPost);

module.exports = router;
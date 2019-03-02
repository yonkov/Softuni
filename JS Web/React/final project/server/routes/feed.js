const router = require('express').Router();
const feedController = require('../controllers/feed');
const isAuth = require('../middleware/is-auth');

router.get('/movies', isAuth, feedController.getMovies);
router.post('/movie/create', isAuth, feedController.createMovie);

module.exports = router;
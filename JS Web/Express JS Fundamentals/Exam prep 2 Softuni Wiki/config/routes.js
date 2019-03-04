const homeController = require('../controllers/home');
const userController = require('../controllers/user');
const articleController = require('../controllers/article');
const restrictedPages = require('./auth');

module.exports = (app) => {
    app.get('/', homeController.index);
    app.get('/users/register', restrictedPages.isAnonymous, userController.registerGet);
    app.post('/users/register', restrictedPages.isAnonymous, userController.registerPost);

    app.get('/users/login', userController.loginGet);
    app.post('/users/login', restrictedPages.isAnonymous, userController.loginPost);
    app.get('/users/logout', restrictedPages.isAuthed, userController.logout);
    // app.all('*', (req, res) => {
    //     res.status(404);
    //     res.send('404 Not Found');
    //     res.end();
    // });


    //TODO Add other app routes and restrict certain pages using auth.js

     app.get('/article/create', restrictedPages.isAuthed, articleController.createGet);
     app.post('/article/create', restrictedPages.isAuthed, articleController.createPost);

     app.get('/article/all', restrictedPages.isAuthed, articleController.all);
     app.get('/article/details/:id', articleController.details);
     
     app.get('/article/edit/:id', restrictedPages.isAuthed, articleController.editGet);
     app.post('/article/edit/:id', restrictedPages.isAuthed, articleController.editPost);
     
     app.get('/search', articleController.search);
     app.get('/article/history/:id', restrictedPages.isAuthed, articleController.getHistory);

     app.get('/article/lock/:id', restrictedPages.hasRole('Admin'), articleController.lock);
     app.get('/article/unlock/:id', restrictedPages.hasRole('Admin'), articleController.unlock);



    // app.get('/article/delete/:id', restrictedPages.isAuthed, articleController.deleteGet);
    // app.post('/article/delete/:id', restrictedPages.isAuthed, articleController.deletePost);


};
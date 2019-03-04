const homeController = require('../controllers/home');
const userController = require('../controllers/user');
const threadController = require('../controllers/thread');
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
    app.post('/threads/find', restrictedPages.isAuthed, threadController.findThreadPost)    
    app.get('/threads/:otherUser', restrictedPages.isAuthed, threadController.findThreadGet)
 
    app.post('/threads/:otherUser', restrictedPages.isAuthed, threadController.sendMessagePost)

    app.post('/block/:otherUser', restrictedPages.isAuthed, threadController.blockUserPost)
    app.post('/unblock/:otherUser', restrictedPages.isAuthed, threadController.unblockUserPost)


    //TODO Add other app routes and restrict certain pages using auth.js

    // app.get('/article/create', restrictedPages.isAuthed, articleController.createGet);
    // app.post('/article/create', restrictedPages.isAuthed, articleController.createPost);

    // app.get('/article/details/:id', articleController.details);

    // app.get('/article/edit/:id', restrictedPages.isAuthed, articleController.editGet);
    // app.post('/article/edit/:id', restrictedPages.isAuthed, articleController.editPost);

    // app.get('/article/delete/:id', restrictedPages.isAuthed, articleController.deleteGet);
    // app.post('/article/delete/:id', restrictedPages.isAuthed, articleController.deletePost);


};
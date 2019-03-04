const User = require('mongoose').model('User');
const Article = require('../models/Article');
const Edit = require('../models/Edit');
let mongoose = require('mongoose');

module.exports = {
    createGet: (req, res) => {
        res.render('article/create');

    },

    createPost: async (req, res) => {
        try {
            let articleBody = req.body;
            let author = req.user._id;
            let article = await Article.create(articleBody);
            let edit = await Edit.create({content: articleBody.content, article: article._id, author});
            
            article.edits.push(edit._id);
            await article.save()
            
            res.redirect('/');

        } catch (error) {
            console.log(error);

        }
    },
    all: async (req, res) => {
        try {
            let articles = await Article.find({});
        
            res.render('article/all', {articles});
            
        } catch (error) {
            console.log(error);
            
        }


    },
    details: async(req, res) => {
        try {
            let articleId = req.params.id;
            let article = await Article.findById(articleId);
            article.content = article.content.split('\r\n\r\n');
            
            res.render('article/details', {article});
            
        } catch (error) {
            console.log(error);
            
        }
    },
    editGet: async(req, res) => {
        try {
            let articleId = req.params.id;
            let article = await Article.findById(articleId);
            
            res.render('article/edit', {article});
        } catch (error) {
            console.log(error);
        }
        
    },
    editPost: async(req, res) => {
        try {
            let articleId = req.params.id;
            let article = await Article.findById(articleId);
            let author = req.user._id;
            let content = req.body.content
            article.content = content;
            await article.save();

            let edit = await Edit.create({content,author, article: article._id});

            article.edits.push(edit._id);
            await article.save()
            res.redirect('/article/details/' + articleId);

        } catch (error) {
            console.log(error);
            
        }
    },
    search: async(req, res)=>{
        try {
            let text = req.query.search;
            let articles = await Article.find();
            
            articles = articles.filter(a=>a.title.toLowerCase().includes(text));
            
            res.render('article/search', {text, articles});
        } catch (err) {
            console.log(err);
            
        }
    },

    getHistory: async(req, res)=>{
        try {
            let editsId = req.params.id; 
            
            let id = mongoose.Types.ObjectId(editsId);
            let articleHistory = await Edit.find({article: [id]})
            .populate('author');
            
            res.render('article/history', {articleHistory});

        } catch (e) {
            console.log(e);            
        }
    },
    lock: async(req,res)=>{
        try {
            let id = req.params.id;
            
            let article = await Article.findById(id)
            article.lockedStatus = true;
            await article.save();
            res.redirect('/');

        } catch (e) {
            console.log(e);
        }
    },
    unlock: async(req,res)=>{
        try {
            let id = req.params.id;
            let article = await Article.findById(id)
            article.lockedStatus = false;
            await article.save();
            res.redirect('/');

        } catch (e) {
            console.log(e);
        }
    }
}
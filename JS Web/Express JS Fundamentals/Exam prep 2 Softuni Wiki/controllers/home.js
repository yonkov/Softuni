const User = require('mongoose').model('User');
const Article = require('../models/Article');
const Edit = require('../models/Edit');
module.exports = {
  index: async (req, res) => {
    // TODO load all (if any) articles and pass them as context
    try {
      // let articles = await Article.find({})
      // .sort({'creationDate': -1})
      // .limit(3);
      let latestArticle = "";
      let articles = await Article.find({}, null, {
          limit: 3
        })
        .sort({
          'creationDate': -1
        })
        
      if (articles.length!==0) {
        latestArticle = articles[0];
        latestArticle.content = latestArticle.content.split(/(\w+)/g)
        .filter(e => e !== ' ')
        .slice(0, 50)
        .join(' ');
      }

      
      res.locals.latestArticle = latestArticle;
      
      res.render('home/index', {
        articles
      });
    } catch (error) {
      console.log(error);
    }
  }
}
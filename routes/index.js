var express = require('express');
var path = require('path');
var db = require('../db')

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  db.getNewest((err, results) => {
    let title = "";
    let content = "";
    if (err) {
      title = "Couldn't find any articles"
      content = "This is pretty sad :("
    }
    else {
      let article = results[0];
      title = article.title;
      content = article.content;
    }

    res.render('index', {
      contentTitle: title,
      content: content
    });
  });
});

module.exports = router;

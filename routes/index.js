var express = require('express');
const path = require('path');
var router = express.Router();
var db = require('../db')

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

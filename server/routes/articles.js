const express = require('express');
const router = express.Router();
const _ = require('lodash');
const securityService = require('../src/service/security-service');
const articleService = require('../src/service/article-service');


// create an Article
router.post('/', securityService.securityMiddleware, function(req, res, next) {
    const data = {
        name: req.body.name,
        content: req.body.content,
        authorId: req.securityContext.userId
    }

    articleService.createArticle(data).then(result => {
        res.status(200);
        res.send(result);
    }).catch(ex => {
        console.error(ex);
        res.status(400);
        res.send(ex);
    })

});

// get Articles
router.get('/', function(req, res, next) {
    let page = parseInt(req.query.page, 10);
    if(_.isNaN(page)) {
        page = 0;
    }

    let size = parseInt(req.query.size, 10);
    if(_.isNaN(size) || size > 100) {
        size = 20;
    }

    articleService.getArticles({page, size}).then(result => {
        res.status(200)
        res.send(result);
    }).catch(ex => {
        console.error(ex);
        res.status(400)
        res.send(ex);
    })

});

module.exports = router;

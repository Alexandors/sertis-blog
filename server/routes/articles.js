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
        status: req.body.status,
        category: req.body.category,
        authorId: req.securityContext.userId,
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


// update an Article
router.put('/', securityService.securityMiddleware, function(req, res, next) {
    const data = {
        _id: req.body._id,
        name: req.body.name,
        content: req.body.content,
        status: req.body.status,
        category: req.body.category,
        authorId: req.securityContext.userId,
    }
    articleService.updateArticle(data).then(result => {
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
        // res.set("X-Total-Count", result.total);
        res.header('X-Total-Count', result.total)
        res.send(result.data);
    }).catch(ex => {
        console.error(ex);
        res.status(400)
        res.send(ex);
    })

});

router.get('/categories', function(req, res, next) {
    articleService.getArticleCategories().then(result => {
        res.status(200).send(result);
    });
});

// get Articles by id
router.get('/:id', function(req, res, next) {
    articleService.getArticleById(req.params.id).then(result => {
        res.status(200)
        res.send(result);
    }).catch(ex => {
        console.error(ex);
        res.status(400)
        res.send(ex);
    })

});


module.exports = router;

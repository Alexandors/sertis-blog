var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/getUser', function(req, res, next) {
  res.send('test1')
  //res.render('index', { title: 'Express' });
});

module.exports = router;

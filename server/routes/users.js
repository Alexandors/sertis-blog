var express = require('express');
var router = express.Router();
var userService = require('../src/service/user-service');
const authService = require("../src/service/authorization-service");
const _ = require('lodash');

// create user
router.post('/', function(req, res, next) {
  const data = {
    username: req.body.username,
    password: req.body.password,
  };
  userService.createUser(data).then((result) => {
    res.status(200).send(result);
  }).catch(ex => {
    res.status(400).send(ex);
  });
});


// get user by name
router.get('/username/:name', function(req, res, next) {
  userService.getUserByName({username: req.params.username}).then((result) => {
    res.status(200).send(result);
  });
});

// login
router.post('/login', function(req, res, next) {
  const data = {
    username: req.body.username,
    password: req.body.password,
  };
  authService.login(data).then(result => {
    if (result === true ) {
      res.status(200).send(true)
    } else {
      res.status(401).send()
    }
  });
});

module.exports = router;

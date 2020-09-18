const express = require('express');
const router = express.Router();
const userService = require('../src/service/user-service');
const authService = require("../src/service/authorization-service");
const securityService = require('../src/service/security-service');
const constants = require('../src/common/constants');
const _ = require('lodash');

// create user
router.post('/', securityService.securityMiddleware, function(req, res, next) {
  if (req.securityContext.userRole !== constants.UserRole.Admin) {
    res.status(403).send('Only Admin can create users');
    return;
  }
  const data = {
    username: req.body.username,
    password: req.body.password,
  };
  userService.createUser(data).then((result) => {
    res.status(200).send(result);
  }).catch(ex => {
    console.error(ex);
    res.status(400).send(ex);
  });
});

// update user
router.put('/', securityService.securityMiddleware, function(req, res, next) {
  if(req.securityContext.userId !== req.body._id) {
    res.status(403).send("Only the user themselves can modify user data");
    return;
  }

  const data = {
    _id: req.body._id,
    password: req.body.password,
  };
  userService.updateUser(data).then((result) => {
    res.status(200).send(result);
  }).catch(ex => {
    console.error(ex);
    res.status(400).send(ex);
  });
});


// get user by name
router.get('/username/:username', securityService.securityMiddleware, function(req, res, next) {
  userService.getUserInfoByUsername(req.params.username).then((result) => {
    if (_.isNil(result)) {
      res.status(404).send();
      return;
    }
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
    if (!_.isNil(result)) {
      res.status(200).send(result)
    } else {
      res.status(401).send()
    }
  }).catch(ex => {
    console.error(ex);
    res.status(500).send(ex)
  });
});

module.exports = router;

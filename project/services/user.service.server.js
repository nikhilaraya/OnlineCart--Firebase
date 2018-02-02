module.exports = function (app) {

  var userModel = require('../model/user/user.model.server');


  app.put('/api/user/:userId', updateUser);
 // app.post("/api/login", login);

  app.get('/api/user', findUser);
  app.get('/api/users', findAllUsers);
  app.get('/api/user/:userId', findUserById);

  app.delete('/api/user/:userId', deleteUser);
  app.delete('/api/deleteAllUsers', deleteAllUsers);

  app.post('/api/register', register);
  app.post("/api/loggedIn", loggedIn);

  var passport = require('passport');
  var LocalStrategy = require('passport-local').Strategy;
  var bcrypt = require("bcrypt-nodejs");

  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);
  passport.use(new LocalStrategy(localStrategy));
  app.post("/api/login", passport.authenticate('local'), login);
  app.post("/api/logout", logout);

  function loggedIn(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
  }

  function serializeUser(user, done) {
    done(null, user);
  }

  function deserializeUser(user, done) {
    userModel
      .findUserById(user._id)
      .then(
        function (user) {
          done(null, user);
        },
        function (err) {
          done(err, null);
        }
      );
  }

  function localStrategy(username, password, done) {
    "use strict";
    userModel
      .findUserByUsername(username)
      .then(
        function (user) {
          if (user && bcrypt.compareSync(password, user.password)) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        },
        function (err) {
          if (err) {
            return done(err);
          }
        }
      );
  }

  // function register(req, res) {
  //   'use strict';
  //   var user = req.body;
  //   console.log(user.username);
  //   return userModel.createUser(user)
  //     .then(
  //       function (user) {
  //         console.log('--1--');
  //         res.json(user);
  //       });
  // }


  function register(req, res) {
    "use strict";
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);

    return userModel.createUser(user)
      .then(
        function (user) {
          if (user) {
            req.login(user, function (err) {
              if (err) {
                res.status(400).send(err);
              } else {
                res.json(user);
              }
            })
          }
        })
  }

  function login(req, res) {
    var user = req.user;
    res.json(user);
  }

  function logout(req, res) {
    req.logOut();
    res.send(200);
  }


// function login(req,res) {
//   var user = req.body;
//   userModel.findUser(user.username,user.password)
//     .then(function (res1) {
//       console.log('--2--');
//       res.json(res1);
//     });
// }


  function findUser(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];

    if (username && password) {
      userModel
        .findUserByCredentials(username, password)
        .then(function (user) {
          if (user) {
            res.json(user);
          } else {
            res.json(null);
          }
        });
      return;

    } else if (username) {
      userModel
        .findUserByUsername(username)
        .then(function (user) {
          if (user) {
            res.json(user);
          } else {
            res.json(null);
          }
        });
      return;
    }
    return res.json({});
  }

  function findUserById(req, res) {
    var userId = req.params['userId'];
    userModel
      .findUserById(userId)
      .then(function (user) {
        if (user) {
          res.json(user);
        } else {
          res.json(null);
        }
      });
    return;
  }

  function updateUser(req, res) {

    var userId = req.params['userId'];
    var userBody = req.body;
    userModel.updateUser(userId, userBody)
      .then(function (returnedUser) {
        res.json(returnedUser);
      });
  }



  function deleteUser(req, res) {
    var userId = req.params['userId'];
    userModel.deleteUser(userId)
      .then(function (user) {
        res.json(user);
      });
  }

  function deleteAllUsers(req, res) {
    userModel.deleteAllUsers()
      .then(function (res1) {
        res.json(res1);
      });
  }

  function findAllUsers(req, res) {
    userModel.findAllUsers()
      .then(function (res1) {
        res.json(res1);
      });
  }

}

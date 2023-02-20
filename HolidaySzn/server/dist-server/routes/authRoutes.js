"use strict";

var _express = require("express");
var _user = _interopRequireDefault(require("../models/user"));
var _userAuthManager = require("../middleware/userAuthManager");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/* Handles all routing for authorization and authnetication - all the passport code and routes will live here */

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;

/* Passport Setup */

require('dotenv').config();
var ensureLogIn = require('connect-ensure-login');
var ensureLoggedIn = ensureLogIn.ensureLoggedIn('/auth/null/');
var googleClientID = process.env.GOOGLE_CLIENT_ID;
var googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
var baseURL = process.env.BASE_URL;
var googleCallback = baseURL + "/auth/google/callback";
var StrategyParams = {
  clientID: googleClientID,
  clientSecret: googleClientSecret,
  callbackURL: googleCallback,
  passReqToCallback: true
};
passport.serializeUser(function (user, done) {
  //console.log(user);
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  //console.log(obj);
  done(null, obj);
});
var passportCallBack = function passportCallBack(req, accessToken, refreshToken, profile, done) {
  //console.log(req.query.scope.split(' ').indexOf('https://www.googleapis.com/auth/gmail.send'));

  var scopes = req.query.scope.split(' ');
  var canSendEmail = scopes.indexOf('https://www.googleapis.com/auth/gmail.send') > -1;
  //console.log(canSendEmail)
  (0, _userAuthManager.createOrModifyUser)(accessToken, refreshToken, profile, scopes, canSendEmail).then(function (user, err) {
    //console.log(user,err)
    return done(err, user);
  });
};
passport.use(new GoogleStrategy(StrategyParams, passportCallBack));

/* Routing Logic */

var authRouter = (0, _express.Router)();
authRouter.get('/google/', passport.authenticate('google', {
  scope: ['email', 'profile', 'https://www.googleapis.com/auth/gmail.send'],
  accessType: 'offline'
}));
authRouter.get('/google/callback', passport.authenticate('google', {
  successRedirect: process.env.CLIENT_URL,
  failureRedirect: '/null/'
}));
authRouter.get('/logout', ensureLoggedIn, function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      res.sendStatus(err);
    } else {
      res.sendStatus(200);
    }
  });
});
authRouter.get('/user', ensureLoggedIn, function (req, res) {
  //console.log(req.user)
  try {
    res.json({
      'user': req.user.email,
      'name': req.user.name,
      'canSendEmail': req.user.canSendEmail || false
    });
  } catch (err) {
    res.send(err);
  }
});
authRouter.get('/user/profile/', ensureLoggedIn, function (req, res) {
  try {
    res.json({
      'user': req.user.email,
      'name': req.user.name,
      'canSendEmail': req.user.canSendEmail || false,
      'createdAt': req.user.createdAt,
      'scopes': req.user.scopes,
      'modifiedAt': req.user.modifiedAt
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});
authRouter.get('/null/', function (req, res) {
  res.sendStatus(403);
});
module.exports = authRouter;
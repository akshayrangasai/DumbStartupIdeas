"use strict";

var _express = require("express");
var _user = _interopRequireDefault(require("../models/user"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/* Handles all routing for authorization and authnetication - all the passport code and routes will live here */

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;

/* Passport Setup */

require('dotenv').config();
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
  //console.log(profile);

  _user["default"].findOrCreate({
    email: profile.email
  }, {
    name: profile.given_name,
    accessToken: accessToken,
    refreshToken: refreshToken,
    createdAt: new Date()
  }).then(function (user, err) {
    return done(err, user);
  });
};
passport.use(new GoogleStrategy(StrategyParams, passportCallBack));

/* Routing Logic */

var authRouter = (0, _express.Router)();
authRouter.get('/google/', passport.authenticate('google', {
  scope: ['email', 'profile', 'https://www.googleapis.com/auth/gmail.compose'],
  accessType: 'offline'
}));
authRouter.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/crud/recepient/all',
  failureRedirect: '/google/'
}));
authRouter.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});
module.exports = authRouter;
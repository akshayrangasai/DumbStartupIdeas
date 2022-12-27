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
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});
var passportCallBack = function passportCallBack(req, accessToken, refreshToken, profile, done) {
  _user["default"].findOrCreate({
    username: profile.id,
    email: profile.email
  }).then(function (err, user) {
    return done(err, user);
  });
};
passport.use(new GoogleStrategy(StrategyParams, passportCallBack));

/* Routing Logic */

var authRouter = (0, _express.Router)();
authRouter.get('/google/', passport.authenticate('google', {
  scope: ['email', 'profile']
}));
authRouter.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/crud/dates/all',
  failureRedirect: '/crud/matches/all'
}));
module.exports = authRouter;
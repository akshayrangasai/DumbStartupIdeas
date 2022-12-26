"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passportAuth = void 0;
/* This File Handles all modules for auth and writing auth into tables. Since these are auth endpoint functions, this will contain all passport functions to work with auth */

require('dotenv').config();
var passport = require('passport');
var googleStrategy = require('passport-google-oauth20').Strategy;
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
var passportCallBack = function passportCallBack(req, accessToken, refreshToken, profile, done) {};
passport.use(new googleStrategy(StrategyParams, passportCallBack));
var passportAuth = function passportAuth(req, res) {
  res.redirect(baseURL.concat(googleCallback));
};
exports.passportAuth = passportAuth;
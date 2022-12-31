/* Handles all routing for authorization and authnetication - all the passport code and routes will live here */

import { Router } from "express";
import user from '../models/user';
const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;

/* Passport Setup */ 

require('dotenv').config();




const googleClientID = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

const baseURL = process.env.BASE_URL;
const googleCallback = baseURL + "/auth/google/callback";

const StrategyParams = {

    clientID: googleClientID,
    clientSecret : googleClientSecret,
    callbackURL : googleCallback,
    passReqToCallback : true

};

passport.serializeUser(function(user, done) {
    //console.log(user);
    done(null, user);
  });
  
  passport.deserializeUser(function(obj, done) {
    //console.log(obj);
    done(null, obj);
  });

const passportCallBack = (req, accessToken, refreshToken, profile, done) => {
    //console.log(profile);

user.findOrCreate({email: profile.email},{name : profile.given_name, accessToken : accessToken, refreshToken : refreshToken, createdAt : new Date()})
.then
(
    (user, err) =>
    {
        return done(err,user);
    }
);

}



passport.use(new GoogleStrategy(StrategyParams,passportCallBack));



/* Routing Logic */

const authRouter = Router();

authRouter.get('/google/', passport.authenticate('google', {scope : ['email','profile','https://www.googleapis.com/auth/gmail.compose'], accessType: 'offline'}));
authRouter.get('/google/callback', passport.authenticate('google',{
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: '/google/'
}));
authRouter.get('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });
module.exports = authRouter;
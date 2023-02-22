/* Handles all routing for authorization and authnetication - all the passport code and routes will live here */

import { Router } from "express";
import user from '../models/user';
const passport = require('passport');
import {createOrModifyUser} from '../middleware/userAuthManager';
var GoogleStrategy = require('passport-google-oauth2').Strategy;

/* Passport Setup */ 

require('dotenv').config();


const ensureLogIn = require('connect-ensure-login');
var ensureLoggedIn = ensureLogIn.ensureLoggedIn('/auth/null/');

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

    const scopes = req.query.scope.split(' ');
    const canSendEmail = scopes.indexOf('https://www.googleapis.com/auth/gmail.send') > -1;
    //console.log(canSendEmail)
  createOrModifyUser(accessToken, refreshToken, profile, scopes , canSendEmail ).then(
    (user, err) =>
      {
        //console.log(user,err)
        return done(err,user);
      }
);

}



passport.use(new GoogleStrategy(StrategyParams,passportCallBack));



/* Routing Logic */

const authRouter = Router();

authRouter.get('/google/', passport.authenticate('google', {scope : ['email','profile','https://www.googleapis.com/auth/gmail.send'], accessType: 'offline'}));

authRouter.get('/google/callback', passport.authenticate('google',{
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: '/null/'
}));

authRouter.get('/logout', ensureLoggedIn, function(req, res, next){
    req.logout(function(err) {
      if (err) { res.sendStatus(err); }
      else{
        res.sendStatus(200);
      }
      
    });
  });


authRouter.get('/user', ensureLoggedIn,(req,res) => {
  //console.log(req.user)
    try
    {
    res.json({
      'user' : req.user.email,
      'name' : req.user.name,
      'canSendEmail' : req.user.canSendEmail || false,
      'image' : req.user.image});
    }
    catch(err)
    {
      res.send(err);
    }
});

authRouter.get('/user/profile/', ensureLoggedIn, (req,res) => {
  try
  {
  res.json({
    'user' : req.user.email,
    'name' : req.user.name,
    'canSendEmail' : req.user.canSendEmail || false,
    'createdAt' : req.user.createdAt,
    'scopes': req.user.scopes,
    'modifiedAt' : req.user.modifiedAt,
    'image' : req.user.image});
  }
  catch(err)
    {
      console.log(err);
      res.send(err);
    }
});

authRouter.get('/null/', (req,res) => {
  res.sendStatus(403);
});

module.exports = authRouter;
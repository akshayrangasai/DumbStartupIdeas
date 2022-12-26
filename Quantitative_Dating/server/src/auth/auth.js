/* This File Handles all modules for auth and writing auth into tables. Since these are auth endpoint functions, this will contain all passport functions to work with auth */

require('dotenv').config();

const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;

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


const passportCallBack = (req, accessToken, refreshToken, profile, done) => {

}


passport.use(new googleStrategy(StrategyParams, passportCallBack));



const passportAuth = (req,res) => {
    res.redirect(baseURL.concat(googleCallback))
}

export {passportAuth};
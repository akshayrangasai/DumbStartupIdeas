/* This File Handles all modules for auth and writing auth into tables. Since these are auth endpoint functions, this will contain all passport functions to work with auth */

require('dotenv').config();

const baseURL = process.env.BASE_URL;
const googleCallback = "/auth/google/callback"

const passportAuth = (req,res) => {
    res.redirect(baseURL.concat(googleCallback))
}

export {passportAuth};
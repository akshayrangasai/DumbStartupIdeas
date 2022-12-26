"use strict";

var _express = require("express");
var _auth = require("../auth/auth");
/* Handles all routing for authorization and authnetication - all the passport code and routes will live here */

var authRouter = (0, _express.Router)();
authRouter.get('/auth/google/', _auth.passportAuth);
module.exports = authRouter;
"use strict";

var _express = require("express");
var _auth = require("../auth/auth");
var _matches = require("../crud/matches");
var crudRouter = (0, _express.Router)();
crudRouter.get('/all/', _matches.getAllMatches);
crudRouter.post('/newMatch/', _matches.newMatch);
module.exports = crudRouter;
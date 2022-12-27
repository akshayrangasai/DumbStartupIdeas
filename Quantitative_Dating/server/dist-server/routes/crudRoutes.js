"use strict";

var _express = require("express");
var _auth = require("../auth/auth");
var _matches = require("../crud/matches");
var _user = require("../crud/user");
var _dates = require("../crud/dates");
var crudRouter = (0, _express.Router)();

/*Matches Routing*/
crudRouter.get('/matches/all/', _matches.getAllMatches);
crudRouter.post('/matches/newMatch/', _matches.newMatch);
crudRouter.get('/matches/allMatchNames/', _matches.allMatchNames);

/* User Routing*/

crudRouter.post('/user/addNew/', _user.newUser);

/* Date Routing*/

crudRouter.post('/dates/addNew/', _dates.newDate);
crudRouter.get('/dates/all/', _dates.getAllDates);
module.exports = crudRouter;
"use strict";

var _express = require("express");
var _auth = require("../auth/auth");
var _user = require("../crud/user");
var _occasion = require("../crud/occasion");
var _recepient = require("../crud/recepient");
var crudRouter = (0, _express.Router)();

/* Create Auth Paths / Make this App use the Auth */

/*Occasion*/

crudRouter.post('/occasion/create/', _occasion.newOccasion);

/* Recepients */

crudRouter.get('/recepient/all/', _recepient.findAllRecepients);

/* User Routing*/

crudRouter.post('/user/addNew/', _user.newUser);
module.exports = crudRouter;
"use strict";

var _express = require("express");
var _auth = require("../auth/auth");
var _user = require("../crud/user");
var _occasion = require("../crud/occasion");
var _recepient = require("../crud/recepient");
var ensureLogIn = require('connect-ensure-login');
var ensureLoggedIn = ensureLogIn.ensureLoggedIn('/auth/google/');
var crudRouter = (0, _express.Router)();

/* Create Auth Paths / Make this App use the Auth */

/*Occasion*/

crudRouter.post('/occasion/create/', ensureLoggedIn, _occasion.newOccasion);
crudRouter.get('/occasion/delete/:id/', ensureLoggedIn, _occasion.deleteOccasion);
crudRouter.get('/occasion/all/', ensureLoggedIn, _occasion.allOccasions);
crudRouter.get('/occasion/sent/all', ensureLoggedIn, _occasion.sentOccasions);
crudRouter.get('/occasion/message/:id', ensureLoggedIn, _occasion.getMessageForOccasion);
/* Recepients */

crudRouter.get('/recepient/all/', ensureLoggedIn, _recepient.findAllRecepients);

/* User Routing*/

//crudRouter.post('/user/addNew/', ensureLoggedIn, newUser);

module.exports = crudRouter;
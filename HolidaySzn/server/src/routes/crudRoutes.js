import { Router } from "express";
import { passportAuth } from "../auth/auth";
import {newUser} from "../crud/user"
import { newOccasion, allOccasions, deleteOccasion } from "../crud/occasion";
import {findAllRecepients} from "../crud/recepient";

const ensureLogIn = require('connect-ensure-login');
var ensureLoggedIn = ensureLogIn.ensureLoggedIn('/auth/google/');


const crudRouter = Router();

/* Create Auth Paths / Make this App use the Auth */

/*Occasion*/

crudRouter.post('/occasion/create/', ensureLoggedIn, newOccasion);
crudRouter.get('/occasion/delete/:id/', ensureLoggedIn, deleteOccasion);
crudRouter.get('/occasion/all/', ensureLoggedIn, allOccasions);
/* Recepients */

crudRouter.get('/recepient/all/', ensureLoggedIn,  findAllRecepients);


/* User Routing*/

//crudRouter.post('/user/addNew/', ensureLoggedIn, newUser);




module.exports = crudRouter;
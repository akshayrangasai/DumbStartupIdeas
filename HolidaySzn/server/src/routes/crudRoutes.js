import { Router } from "express";
import { passportAuth } from "../auth/auth";
import {newUser} from "../crud/user"
import { newOccasion } from "../crud/occasion";
import {findAllRecepients} from "../crud/recepient"

const crudRouter = Router();

/* Create Auth Paths / Make this App use the Auth */

/*Occasion*/

crudRouter.post('/occasion/create/', newOccasion);

/* Recepients */

crudRouter.get('/recepient/all/', findAllRecepients);

/* User Routing*/

crudRouter.post('/user/addNew/', newUser);




module.exports = crudRouter;
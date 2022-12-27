import { Router } from "express";
import { passportAuth } from "../auth/auth";
import {getAllMatches, newMatch, allMatchNames} from "../crud/matches"
import {newUser} from "../crud/user"
import {getAllDates, newDate} from "../crud/dates"

const crudRouter = Router();

/*Matches Routing*/
crudRouter.get('/matches/all/', getAllMatches);
crudRouter.post('/matches/newMatch/', newMatch);
crudRouter.get('/matches/allMatchNames/', allMatchNames);

/* User Routing*/

crudRouter.post('/user/addNew/', newUser);

/* Date Routing*/

crudRouter.post('/dates/addNew/', newDate);
crudRouter.get('/dates/all/', getAllDates);


module.exports = crudRouter;
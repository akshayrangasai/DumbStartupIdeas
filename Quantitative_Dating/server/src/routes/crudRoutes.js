import { Router } from "express";
import { passportAuth } from "../auth/auth";
import {getAllMatches, newMatch} from "../crud/matches"

const crudRouter = Router();

crudRouter.get('/all/', getAllMatches);
crudRouter.post('/newMatch/', newMatch);

module.exports = crudRouter;
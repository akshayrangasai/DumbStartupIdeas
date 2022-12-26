import { Router } from "express";
import { passportAuth } from "../src/auth/auth";
import {getAllMatches} from "../src/crud/crud"

const crudRouter = Router();

crudRouter.get('/all/', getAllMatches);

module.exports = crudRouter;
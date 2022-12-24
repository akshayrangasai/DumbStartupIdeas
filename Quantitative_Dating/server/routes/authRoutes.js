/* Handles all routing for authorization and authnetication - all the passport code and routes will live here */

import { Router } from "express";
import { passportAuth } from "../src/auth/auth";

const authRouter = Router();

authRouter.get('/auth/google/', passportAuth);

module.exports = authRouter;
import { Router } from "express";
import user from '../models/user';
const passport = require('passport');
import {createOrModifyUser} from '../middleware/userAuthManager';
require('dotenv').config();
import { emailDispatch, emailDispatchTest } from "../platform/nightlyEmailDispatch";

const platformRouter = Router();

platformRouter.post('/greetingDispatch', emailDispatch)
platformRouter.post('/test/dispatch', emailDispatchTest)

module.exports = platformRouter
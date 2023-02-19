import { Router } from "express";
import user from '../models/user';
const passport = require('passport');
import {createOrModifyUser} from '../middleware/userAuthManager';
require('dotenv').config();
import { emailDispatch, emailDispatchTest } from "../platform/nightlyEmailDispatch";
import { webhookAuthCheck } from "../middleware/checkAuth";

const ensureLogIn = require('connect-ensure-login');
var ensureLoggedIn = ensureLogIn.ensureLoggedIn('/auth/google/');

const platformRouter = Router();

if(process.env.NOAUTH_ACCESS)
if(process.env.NOAUTH_ACCESS == process.env.NODE_ENV)
{
    platformRouter.get(process.env.DISPATCH_TEST_URL, emailDispatchTest)
} 


//platformRouter.use(webhookAuthCheck)

platformRouter.post('/greetingDispatch', webhookAuthCheck,  emailDispatch)
platformRouter.get('/test/message/:id',  ensureLoggedIn, emailDispatchTest)





module.exports = platformRouter
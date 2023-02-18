import { Router } from "express";
import user from '../models/user';
const passport = require('passport');
import {createOrModifyUser} from '../middleware/userAuthManager';
require('dotenv').config();
import { emailDispatch, emailDispatchTest } from "../platform/nightlyEmailDispatch";
import { webhookAuthCheck } from "../middleware/checkAuth";

const platformRouter = Router();

if(process.env.NOAUTH_ACCESS)
if(process.env.NOAUTH_ACCESS == process.env.NODE_ENV)
{
    platformRouter.get(process.env.DISPATCH_TEST_URL, emailDispatchTest)
} 


platformRouter.use(webhookAuthCheck)

platformRouter.post('/greetingDispatch',  emailDispatch)





module.exports = platformRouter
"use strict";

var _express = require("express");
var _user = _interopRequireDefault(require("../models/user"));
var _userAuthManager = require("../middleware/userAuthManager");
var _nightlyEmailDispatch = require("../platform/nightlyEmailDispatch");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var passport = require('passport');
require('dotenv').config();
var platformRouter = (0, _express.Router)();
platformRouter.post('/greetingDispatch', _nightlyEmailDispatch.emailDispatch);
platformRouter.post('/test/dispatch', _nightlyEmailDispatch.emailDispatchTest);
platformRouter.get('/test/dispatch', _nightlyEmailDispatch.emailDispatchTest);
module.exports = platformRouter;
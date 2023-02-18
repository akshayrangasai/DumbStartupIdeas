"use strict";

var _express = require("express");
var _user = _interopRequireDefault(require("../models/user"));
var _userAuthManager = require("../middleware/userAuthManager");
var _nightlyEmailDispatch = require("../platform/nightlyEmailDispatch");
var _checkAuth = require("../middleware/checkAuth");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var passport = require('passport');
require('dotenv').config();
var platformRouter = (0, _express.Router)();
if (process.env.NOAUTH_ACCESS) if (process.env.NOAUTH_ACCESS == process.env.NODE_ENV) {
  platformRouter.get(process.env.DISPATCH_TEST_URL, _nightlyEmailDispatch.emailDispatchTest);
}
platformRouter.use(_checkAuth.webhookAuthCheck);
platformRouter.post('/greetingDispatch', _nightlyEmailDispatch.emailDispatch);
module.exports = platformRouter;
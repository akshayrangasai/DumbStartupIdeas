"use strict";

require('dotenv').config();
var isLoggedIn = function isLoggedIn(req, res, next) {
  console.log(req);
};
function webhookAuthCheck(req, res, next) {
  console.log(req.body);
  if (req.body.key == process.env.EMAIL_ENDPOINT_PASSWORD) {
    //next();
    res.send("success");
  } else {
    res.send(403);
  }
}
module.exports = {
  webhookAuthCheck: webhookAuthCheck
};
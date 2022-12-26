"use strict";

var userModel = require("../models/user");
var newUser = function newUser(req, res) {
  var userData = {
    username: req.body.username || 'akshayrangasai',
    password: req.body.password || 'akshayrangasai',
    email: req.body.email || 'test@dumbstartupideas.com',
    createdAt: new Date()
  };
  console.log(userData);
  userModel.create(userData).then(function (data, err) {
    return res.json(data);
  })["catch"](function (err) {
    return console.log(err);
  });
};
module.exports = {
  newUser: newUser
};
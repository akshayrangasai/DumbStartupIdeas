"use strict";

var userModel = require("../models/user");
var newUser = function newUser(req, res) {
  var userData = {
    name: req.body.name || 'Akshay',
    password: req.body.password || 'akshayrangasai',
    email: req.body.email || 'test@dumbstartupideas.com',
    createdAt: new Date()
  };

  //console.log(userData);
  userModel.create(userData).then(function (data, err) {
    return res.json(data);
  })["catch"](function (err) {
    return console.log(err);
  });
};
var findUser = function findUser(email) {
  return new Promise(function (resolve, reject) {
    var userData = {
      email: email || 'test@dumbstartupideas.com'
    };

    //console.log(userData);
    userModel.findOne(userData).then(function (data, err) {
      return resolve(data);
    })["catch"](function (err) {
      console.log(err);
      reject(err);
    });
  });
};
var findUserById = function findUserById(Id) {
  return new Promise(function (resolve, reject) {
    var userData = {
      _id: Id
    };

    //console.log(userData);
    userModel.findOne(userData).then(function (data, err) {
      return resolve(data);
    })["catch"](function (err) {
      console.log(err);
      reject(err);
    });
  });
};
module.exports = {
  newUser: newUser,
  findUser: findUser,
  findUserById: findUserById
};
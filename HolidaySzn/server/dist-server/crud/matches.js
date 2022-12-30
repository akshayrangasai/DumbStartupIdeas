"use strict";

var matchModel = require("../models/match");
var userModel = require("../models/user");
var getAllMatches = function getAllMatches(req, res) {
  /* 
  //Once we figure out auth can do this
  
  const user = req.body.user;
  
  */
  matchModel.find( /*{matchUser : user}*/).then(function (data, err) {
    return res.json(data);
  })["catch"](function (err) {
    return console.log(err);
  });
};
var newMatch = function newMatch(req, res) {
  userModel.findOne({
    username: req.body.user || 'akshayrangasai'
  }).then(function (userData, err) {
    var userid = userData._id;
    var matchData = {
      matchUser: userid,
      matchName: req.body.matchName || 'Aditya K Anguria',
      matchDate: req.body.matchDate || '11/26/1992',
      matchSource: req.body.matchSource || 'Bumble',
      matchSourceDetails: req.body.matchSourceDetails || 'Bumble BFF',
      matchNotes: req.body.matchNotes || 'Hottie'
    };
    console.log(matchData);
    matchModel.create(matchData).then(function (data, err) {
      return res.json(data);
    })["catch"](function (err) {
      return console.log(err);
    });
  })["catch"](function (err) {
    return console.log(err);
  });
};

/* Separate End Point to Creat a list that we can hit for our date API*/
var allMatchNames = function allMatchNames(req, res) {
  userModel.findOne({
    username: req.body.user || 'akshayrangasai'
  }).then(function (userData, err) {
    var query = {
      matchUser: userData._id
    };
    console.log(query);
    matchModel.find(query, "_id matchName").then(function (data, err) {
      return res.json(data);
    })["catch"](function (err) {
      return console.log(err);
    });
  })["catch"](function (err) {
    return console.log(err);
  });
};
module.exports = {
  getAllMatches: getAllMatches,
  newMatch: newMatch,
  allMatchNames: allMatchNames
};
"use strict";

var _match = require("../models/match");
var getAllMatches = function getAllMatches(req, res) {
  /* 
  //Once we figure out auth can do this
  
  const user = req.body.user;
  
  */
  _match.matchModel.findAll( /*{matchUser : user}*/).then(function (data, err) {
    return res.json(data);
  })["catch"](function (err) {
    return console.log(err);
  });
};
var newMatch = function newMatch(req, res) {
  var matchData = {
    matchUser: req.body.user || 'akshay@sigmacomputing.com',
    matchName: req.body.matchName,
    matchDate: req.body.matchDate,
    matchSource: req.body.matchSource,
    matchSourceDetails: req.body.matchSourceDetails,
    matchNotes: req.body.matchNotes
  };
  _match.matchModel.insertOne(matchData).then(function (data, err) {
    return res.json(data);
  })["catch"](function (err) {
    return console.log(err);
  });
};
module.exports = {
  getAllMatches: getAllMatches,
  newMatch: newMatch
};
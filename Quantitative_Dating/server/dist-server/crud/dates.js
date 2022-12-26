"use strict";

var dateModel = require("../models/date");
var matchModel = require("../models/match");
var getAllDates = function getAllDates(req, res) {
  /* 
  //Once we figure out auth can do this
  
  const user = req.body.user;
  
  */
  dateModel.find( /*{matchUser : user}*/).then(function (data, err) {
    return res.json(data);
  })["catch"](function (err) {
    return console.log(err);
  });
};

/* Have to pass Match ID from the dropdown list. Need to validate if match id exists, else we rekt */
var newDate = function newDate(req, res) {
  var matchID = req.body.matchID || "63aa1903ea95f8f7e28656ff";
  matchModel.findOne({
    _id: matchID
  }).then(function (matchData, err) {
    console.log(matchData);
    var dateDetails = {
      dateMatch: matchData._id,
      dateDate: new Date()
    };
    dateModel.create(dateDetails).then(function (data, err) {
      return res.json(data);
    })["catch"](function (err) {
      return console.log(err);
    });
  })["catch"](function (err) {
    return console.log(err);
  });

  //res.send('Great Job')
};

module.exports = {
  getAllDates: getAllDates,
  newDate: newDate
};
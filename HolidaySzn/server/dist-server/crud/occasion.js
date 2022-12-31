"use strict";

var _user = require("./user");
var _recepient = require("./recepient");
var _crudToMessage = require("../platform/crudToMessage");
var occasionModel = require("../models/occasion");
//const userModel = require("../models/user");

var newOccasion = function newOccasion(req, res) {
  (0, _recepient.createOrFindRecepient)(req, res).then(function (recepientData, err) {
    (0, _user.findUser)(req.user.doc.email).then(function (userData) {
      var recepientid = recepientData._id;
      var occasionData = {
        fromUser: userData._id,
        recepientDetails: recepientid,
        occasionDate: req.body.occasionDate || new Date(),
        occasionDetails: req.body.occasionDetails || null,
        occasionName: req.body.occasionName || "Birthday",
        createdAt: new Date()
      };
      console.log(occasionData);
      occasionModel.create(occasionData).then(function (data, err) {
        //Send to message builder and build message from it in the platform
        (0, _crudToMessage.insertMessage)(data);
        res.json(data);
      })["catch"](function (err) {
        return console.log(err);
      });
    });
  })["catch"](function (err) {
    return console.log(err);
  });
};
module.exports = {
  newOccasion: newOccasion
};
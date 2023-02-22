"use strict";

var _user = require("./user");
var recepientModel = require("../models/recepient");
var findAllRecepients = function findAllRecepients(req, res) {
  //console.log();
  var userEmail = req.user.email;
  (0, _user.findUser)(userEmail).then(function (user) {
    var recepientData = {
      fromUser: user._id
    };
    recepientModel.find(recepientData).then(function (data) {
      return res.send(data);
    });
  })["catch"](function (err) {
    return res.send(err);
  });
};
var findRecepientById = function findRecepientById(Id) {
  return new Promise(function (resolve, reject) {
    var recepientData = {
      _id: Id
    };
    recepientModel.findOne(recepientData).then(function (data) {
      return resolve(data);
    })["catch"](function (err) {
      return reject(err);
    });
  });
};
var createOrFindRecepient = function createOrFindRecepient(req, res) {
  return new Promise(function (resolve, reject) {
    var userEmail = req.user.email;
    var fromUserId = req.user._id;
    recepientModel.findOne({
      toEmail: req.body.toEmail,
      fromUser: fromUserId
    }).then(function (recepientData, err) {
      if (!recepientData) {
        (0, _user.findUser)(userEmail).then(function (user) {
          var recepientData = {
            fromUser: user._id,
            /*Pass user id for match - can autopopulate with session data*/
            toEmail: req.body.toEmail || "akshayrangasai.d@gmail.com",
            toPhone: req.body.toPhone || null,
            toName: req.body.toName || "Akshay Rangasai",
            toDetails: req.body.toDetails
          };

          //console.log(recepientData);
          recepientModel.create(recepientData).then(function (data, err) {
            return resolve(data);
          })["catch"](function (err) {
            return reject(err);
          });
        });
      } else {
        resolve(recepientData);
      }
    })["catch"](function (err) {
      return reject(err);
    });
  });
};
module.exports = {
  createOrFindRecepient: createOrFindRecepient,
  findAllRecepients: findAllRecepients,
  findRecepientById: findRecepientById
};

//mongodb+srv://dumblord@0V2vgSVGC6NkvUUTcluster0.xzyu0mk.mongodb.net/Holiday_szn
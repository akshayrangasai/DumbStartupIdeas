"use strict";

var _mongoose = require("mongoose");
var _Schema;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/* Collect a recipients data and schedule greetings for them. We collect phone (future options), 
email and occasion with some additional  details about the person passed on for gpt-3 to generate text 
*/
var messageBuildSchema = new _mongoose.Schema((_Schema = {
  fromUser: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  occasionId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'occasionModel',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  fromEmail: {
    type: String,
    required: true
  },
  fromName: {
    type: String,
    required: true
  },
  toEmail: {
    type: String,
    required: true
  },
  toName: {
    type: String,
    required: true
  },
  toPhone: {
    type: String
  }
}, _defineProperty(_Schema, "toName", {
  type: String,
  required: true
}), _defineProperty(_Schema, "occasionDate", {
  type: Date,
  required: true
}), _defineProperty(_Schema, "toDetails", {
  type: String
}), _defineProperty(_Schema, "occasionName", {
  type: String,
  required: true
}), _defineProperty(_Schema, "occasionDetails", {
  type: String
}), _defineProperty(_Schema, "formatting", {
  type: Boolean
}), _Schema));

/* This model gives us a message in an easy to send format, linked to MessageBuild just for easy reterival 
const emailMessageSchema = new Schema({

    messageBuilder : {type : Schema.Types.ObjectId, ref : 'messageBuildModel', required : true},
    fromName: {type : String, required : true},
    fromEmail: {type : String, required : true},
    toEmail: {type : String, required : true},
    toName: {type : String, required : true},
    subect : {type : String, required : true},
    emailContent : {type : String, required : true},
    occasionDate : {type : Date, required : true }

})
*/
var messageBuildModel = (0, _mongoose.model)('messageBuildModel', messageBuildSchema);
//const emailMessage = model('emailMessage', emailMessageSchema);

module.exports = messageBuildModel;
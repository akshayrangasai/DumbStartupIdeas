"use strict";

var _mongoose = require("mongoose");
/* Collect a recipients data and schedule greetings for them. We collect phone (future options), 
email and occasion with some additional  details about the person passed on for gpt-3 to generate text 
*/
var messageBuildSchema = new _mongoose.Schema({
  fromUser: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'user',
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
  toEmail: {
    type: String,
    required: true
  },
  toPhone: {
    type: String
  },
  toName: {
    type: String,
    required: true
  },
  occasionDate: {
    type: Date,
    required: true
  },
  toDetails: {
    type: String
  },
  occasionName: {
    type: String,
    required: true
  },
  occasionDetails: {
    type: String
  }
});
var messageBuildModel = (0, _mongoose.model)('messageBuildModel', messageBuildSchema);
module.exports = messageBuildModel;
"use strict";

var _mongoose = require("mongoose");
/* Collect a recipients data and schedule greetings for them. We collect phone (future options), 
email and occasion with some additional  details about the person passed on for gpt-3 to generate text 
*/
var emailSchema = new _mongoose.Schema({
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
  recepientId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'recepientModel',
    required: true
  },
  messageId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'messageModel',
    required: true
  },
  toName: {
    type: String,
    required: true
  },
  toEmail: {
    type: String,
    required: true
  },
  emailSubject: {
    type: String,
    required: true
  },
  emailBody: {
    type: String,
    required: true
  },
  emailDate: {
    type: Date,
    required: true
  },
  emailId: {
    type: String,
    required: true
  },
  emailThreadId: {
    type: String,
    required: true
  },
  emailLabels: {
    type: Array,
    required: true
  },
  formatting: {
    type: Boolean
  }
});
var finalEmailModel = (0, _mongoose.model)('finalEmailModel', emailSchema);
module.exports = finalEmailModel;
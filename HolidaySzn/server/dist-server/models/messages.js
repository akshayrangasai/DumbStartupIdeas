"use strict";

var _mongoose = require("mongoose");
/* Collect a recipients data and schedule greetings for them. We collect phone (future options), 
email and occasion with some additional  details about the person passed on for gpt-3 to generate text 
*/
var messageSchema = new _mongoose.Schema({
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
  },
  occasionDate: {
    type: Date,
    required: true
  },
  emailSubject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  formattedMessage: {
    type: String,
    required: true
  },
  sentStatus: {
    type: Boolean,
    required: true
  },
  formatting: {
    type: Boolean
  }
});
var messageModel = (0, _mongoose.model)('messageModel', messageSchema);
module.exports = messageModel;
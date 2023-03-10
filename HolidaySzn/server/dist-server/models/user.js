"use strict";

var _mongoose = require("mongoose");
var findOrCreate = require('mongoose-findorcreate');
var userSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  modifiedAt: {
    type: Date
  },
  accessToken: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
    required: true
  },
  scopes: {
    type: Array,
    required: true
  },
  canSendEmail: {
    type: Boolean,
    required: true
  },
  image: {
    type: String
  }
});
userSchema.plugin(findOrCreate);
var user = (0, _mongoose.model)('user', userSchema);
module.exports = user;
"use strict";

var _mongoose = require("mongoose");
var userSchema = new _mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
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
  }
});
var user = (0, _mongoose.model)('user', userSchema);
module.exports = user;
"use strict";

var _mongoose = require("mongoose");
var dateSchema = new _mongoose.Schema({
  dateMatch: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'matchModel',
    required: true
  },
  /*Pass user id for match - can autopopulate with session data*/
  dateDate: {
    type: Date,
    required: true
  }
});
var dateModel = (0, _mongoose.model)('dateModel', dateSchema);
module.exports = dateModel;
"use strict";

var _mongoose = require("mongoose");
var dateSchema = new _mongoose.Schema({
  /* dateUser :
  Should we add a user here so we can just get a list of all dates for the user?
  */

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
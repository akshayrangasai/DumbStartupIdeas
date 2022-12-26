"use strict";

var _mongoose = require("mongoose");
var matchSchema = new _mongoose.Schema({
  matchUser: {
    type: String,
    required: true
  },
  /*Pass user id for match - can autopopulate with session data*/
  matchName: {
    type: String,
    required: true
  },
  matchDate: {
    type: Date,
    required: true
  },
  matchSource: {
    type: String,
    required: true
  },
  matchSourceDetails: {
    type: String
  },
  matchNotes: {
    type: String
  }
});
var matchModel = (0, _mongoose.model)('matchModel', matchSchema);
module.exports = matchModel;
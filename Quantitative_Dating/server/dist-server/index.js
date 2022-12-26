"use strict";

require('dotenv').config();
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

/*Import Routes*/

var crudRouter = require("./routes/crudRoutes.js");
var mongo_user = process.env.DB_USER;
var mongo_pwd = process.env.DB_PWD;
var mongo_url = process.env.DB_URL;
var _PORT = process.env.SERVER_PORT;
var mongoConnString = "mongodb+srv://" + mongo_user + ":" + mongo_pwd + "@" + mongo_url;
mongoose.connect(mongoConnString);
var mongoConnection = mongoose.connection;
mongoConnection.on('error', console.error.bind(console, 'Console Error'));
var app = express();
app.use(cors({
  origin: process.env.CORS_ORIGIN
}));
app.use(bodyParser.urlencoded({
  extended: true
}));

/*Wait for DB connection before running server */

mongoConnection.once('open', function () {
  console.log('Connected to DB');
  app.listen(_PORT, function () {
    return console.log('Listening in port', _PORT);
  });
  app.use('/matches', crudRouter);
});
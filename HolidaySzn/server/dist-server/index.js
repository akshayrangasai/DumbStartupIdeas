"use strict";

require('dotenv').config();
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo');
var passport = require('passport');
var cron = require('node-cron');

/*Import Routes*/

var crudRouter = require("./routes/crudRoutes.js");
var authRouter = require('./routes/authRoutes');
var platformRouter = require('./routes/platformRoutes');
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
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
}));
console.log('Accepting connections from', process.env.CORS_ORIGIN);
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

/*Wait for DB connection before running server */

mongoConnection.once('open', function () {
  /* Middleware for sessions */

  app.use(cookieParser());
  app.use(session({
    secret: process.env.COOKIE_SECRET,
    name: 'greetings.session',
    store: mongoStore.create({
      client: mongoConnection.client
    }),
    proxy: true,
    resave: true,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  /* Middleware Ends */

  console.log('Connected to DB');
  app.listen(_PORT, function () {
    return console.log('Listening in port', _PORT);
  });
  app.use('/crud', crudRouter);
  app.use('/auth', authRouter);
  app.use('/platform', platformRouter);
  app.get('/', function (req, res) {
    console.log('Request');
    res.send('Hello world');
  });
});
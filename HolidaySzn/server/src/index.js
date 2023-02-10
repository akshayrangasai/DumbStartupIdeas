require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const mongoStore = require('connect-mongo');
const passport = require('passport');


/*Import Routes*/

var crudRouter = require("./routes/crudRoutes.js");
var authRouter = require('./routes/authRoutes');


const mongo_user = process.env.DB_USER;
const mongo_pwd = process.env.DB_PWD;
const mongo_url = process.env.DB_URL;
const _PORT = process.env.SERVER_PORT;

const mongoConnString = "mongodb+srv://"+mongo_user+":"+mongo_pwd+"@"+mongo_url;

mongoose.connect(mongoConnString);

const mongoConnection = mongoose.connection;

mongoConnection.on('error', console.error.bind(console, 'Console Error'));

const app = express();

app.use(cors(
    {
    origin:process.env.CORS_ORIGIN,
    credentials:true, 
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
    }))
console.log('Accepting connections from',process.env.CORS_ORIGIN);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


/*Wait for DB connection before running server */

mongoConnection.once('open',() => {

    /* Middleware for sessions */

app.use( cookieParser()); 
app.use( session({ 
	secret: process.env.COOKIE_SECRET,
	name:   'greetings.session',
	store:  mongoStore.create({client:mongoConnection.client}),
	proxy:  true,
    resave: true,
    saveUninitialized: true
}));
app.use( passport.initialize());
app.use( passport.session());
    
/* Middleware Ends */

    console.log('Connected to DB');
    app.listen(_PORT, () => console.log('Listening in port', _PORT));
    app.use('/crud',crudRouter);
    app.use('/auth', authRouter);
    app.get('/', (req,res) => {console.log('Request'); res.send('Hello world');})
    

});
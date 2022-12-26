require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');

/*Import Routes*/

var crudRouter = require("./routes/crudRoutes.js");


const mongo_user = process.env.DB_USER;
const mongo_pwd = process.env.DB_PWD;
const mongo_url = process.env.DB_URL;
const _PORT = process.env.SERVER_PORT;

const mongoConnString = "mongodb+srv://"+mongo_user+":"+mongo_pwd+"@"+mongo_url;

mongoose.connect(mongoConnString);

const mongoConnection = mongoose.connection;

mongoConnection.on('error', console.error.bind(console, 'Console Error'));

const app = express();

app.use(cors(/*{origin:process.env.CORS_ORIGIN}*/))
console.log('Accepting connections from',process.env.CORS_ORIGIN);
app.use(bodyParser.urlencoded({ extended: true }));

/*Wait for DB connection before running server */

mongoConnection.once('open',() => {
    
    console.log('Connected to DB');
    app.listen(_PORT, () => console.log('Listening in port', _PORT));
    app.use('/crud',crudRouter);
    app.get('/', (req,res) => {console.log('Request'); res.send('Hello world');})


});
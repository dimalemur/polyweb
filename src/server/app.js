
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const morgan = require('morgan');


const config = require('./config');

let app = express();

console.log(config);


app
    .use(morgan('combined'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(session({
        resave: true,
        saveUninitialized: true,
        secret: config.secret
    }))
    .get('/ping', (_req, res) => res.sendStatus(200))
    .use(express.static(path.join(__dirname, "../../public/build/")))
    .use('/login/authhelp/', express.static(path.join(__dirname, "../../public/build/")))


app.listen(config.port, (err) => {
    console.log(`Server is started in http://127.0.0.1:${config.port}/`);
});
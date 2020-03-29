const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const db = require('./db');
import config from './config';
import authRoute from './routes/auth';
import userRoute from './routes/user';
import errorHandler from './middlewares/errorHandler';
import checkToken from './middlewares/checkToken';

const app = express();

const staticWay = express.static(path.join(__dirname, "../../public/build/"));

app
    .use(morgan('tiny'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(session({
        resave: true,
        saveUninitialized: true,
        secret: config.secret
    }))
    .get('/ping', (_req, res) => res.sendStatus(200)) // проверка пинга
    //Роутинг страниц
    .use(staticWay)
    .use('/login/authhelp/',staticWay)
    // api роутинг
    .use('/api', authRoute) //аутенфикация
    .use('/api', checkToken, userRoute) //получаем юзезра по id (ьез пароля)
    .get('/test', checkToken, (req,res) => { //получаем токен, возвращаем объект с id пользователя 
        res.json(req.token);
    })
    .use(errorHandler) //обработка необработанных ошибок

app.listen(config.port, (err) => {
    console.log(`Server is started in http://127.0.0.1:${config.port}/`);
});
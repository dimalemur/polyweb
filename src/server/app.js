const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const db = require('./db');
import config from './config';
import authRoute from './routes/auth';
import userRoute from './routes/user';
import pageRoute from './routes/page';
import errorHandler from './middlewares/errorHandler';
import getUser from './middlewares/getUser';
import checkToken from './middlewares/checkToken';
import { checkUserByName } from './controllers/user'

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
    .get('/ping', (_req, res) => res.json({"status":200})) // проверка пинга
    // api роутинг
    .use('/api', authRoute) //аутенфикация
    .use('/api', checkToken, userRoute) //получаем юзезра по id (без пароля)
    .get('/checkAuth', checkToken, (req,res) => { //получаем токен, возвращаем объект с id пользователя 
        res.json(req.token);
    })
    .use('/api', checkToken, pageRoute) //добавление и получение записей
    //Роутинг страниц
    .use('/',staticWay)
    .use('/login/authhelp/',staticWay)
    .use('/:user/', checkUserByName, staticWay )
    .use('/*/:page', staticWay )
    //обработка необработанных ошибок
    .use(errorHandler) 

app.listen(config.port, (err) => {
    console.log(`Server is started in http://127.0.0.1:${config.port}/`);
});
import config from './config';
import authRoute from './routes/auth';
import userRoute from './routes/user';
import infoRoute from './routes/info';
import pageRoute from './routes/page';
import generalInfoRoute from './routes/generalInfo';
import errorHandler from './middlewares/errorHandler';
import checkToken from './middlewares/checkToken';
import { checkUserByName } from './controllers/user';

const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const db = require('./db');// eslint-disable-line no-unused-vars

const app = express();

const staticWay = express.static(path.join(__dirname, '../../public/build/'));

app
  .use(morgan('tiny'))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(session({
    resave: true,
    saveUninitialized: true,
    secret: config.secret,
  }))
  .get('/ping', (_req, res) => res.json({ status: 200 })) // проверка пинга
  // api роутинг
  .use('/api', authRoute) // аутенфикация
  .use('/api', checkToken, userRoute) // получаем юзезра по id (без пароля)
  .use('/api', checkToken, pageRoute) // информация связанная с пользователем
  .use('/api', checkToken, generalInfoRoute) // информация не связанная с пользователем
  .use('/api', checkToken, infoRoute) // добавление и получение записей
  .get('/checkAuth', checkToken, (req, res) => { // получаем токен, возвращаем объект с id пользователя
    res.json(req.token);
  })
  // Роутинг страниц
  .use('/', staticWay)
  .use('/login/authhelp/', staticWay)
  .use('/:user', checkUserByName, staticWay)
  .use('/:user/:page', checkUserByName, staticWay)

  // обработка необработанных ошибок
  .use(errorHandler);

app.listen(config.port, (err) => {
  console.log(`Server is started in http://127.0.0.1:${config.port}/`);
});

import jwt from 'jsonwebtoken'; // модуль для получения токена

import config from '../config';

export default async (req, res, next) => {
  const token = req.headers.authorization; // получаем токен из заголовка запроса
  if (!token) {
    res.status(403).send('Forbidden. No tocken!');
    return next();
  }

  let tokenObj;
  try {
    tokenObj = jwt.verify(token, config.secret); // расшифровываем токен по ключу
  } catch ({ message }) {
    res.status(400).send(message);
    return next();
  }
  req.token = tokenObj; // во всех объектах req добавляем свойство token
  next();
};

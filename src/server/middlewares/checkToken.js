import jwt from 'jsonwebtoken'; // модуль для получения токена

import config from '../config';

export default async (req, res, next) => {
  const token = req.headers.authorization; // получаем токен из заголовка запроса

  if (!token) {
    return next({
      status: 403,
      message: 'Forbidden. No tocken!',
    });
  }

  let tokenObj;

  try {
    tokenObj = jwt.verify(token, config.secret); // расшифровываем токен по ключу
  } catch ({ message }) {
    return next({
      status: 400,
      message,
    });
  }

  req.token = tokenObj; // во всех объектах req добавляем свойство token
  next();
};

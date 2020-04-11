import jwt from 'jsonwebtoken';
import config from '../config';

import User from '../models/user';

// регистрация
export const signup = async (req, res, next) => {
  const credentials = req.body; // данные из формы
  let user;

  console.log(credentials);

  if (!credentials.login || !credentials.password) {
    res.status(400).send('no data entered');
    return next();
  }

  try {
    user = await User.create(credentials); // создаём нового пользователя
  } catch ({ message }) {
    res.status(400).send(message);
    return next();
  }

  res.json(user); // возвращаем пользоваетя
};

// авторизация
export const signin = async (req, res, next) => {
  console.log(req.body);

  const { login, password } = req.body;

  const user = await User.findOne({ login }); // ищем пользователя по логину

  if (!user) {
    res.status(400).send('Not found');
    return next();
  }

  const result = await user.comparePasswords(password); // сравниваем пароли

  if (!result) {
    res.status(400).send('Bad Creditials');
    return next();
  }

  const token = jwt.sign({ _id: user._id }, config.secret); // создаём токен по секретному ключу
  res.json({ token, status: 200 }); // выдаём токен
};

import jwt from 'jsonwebtoken';
import config from '../config';

import User from '../models/user';

// регистрация
export const signup = async (req, res, next) => {
  const credentials = req.body; // данные из формы
  let user;

  try {
    user = await User.create(credentials); // создаём нового пользователя
  } catch ({ message }) {
    return next({
      status: 400,
      message,
    });
  }

  res.json(user); // возвращаем пользоваетя
};

// авторизация
export const signin = async (req, res, next) => {
  console.log(req.body);

  const { login, password } = req.body;

  const user = await User.findOne({ login }); // ищем пользователя по логину

  if (!user) {
    return next({
      status: 400,
      message: 'Not found',
    });
  }

  const result = await user.comparePasswords(password); // сравниваем пароли

  if (!result) {
    return next({
      status: 400,
      message: 'Bad Creditials',
    });
  }

  const token = jwt.sign({ _id: user._id }, config.secret); // создаём токен по секретному ключу
  res.json({ token, status: 200 }); // выдаём токен
};

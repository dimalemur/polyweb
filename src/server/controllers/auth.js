import jwt from 'jsonwebtoken';
import config from '../config';

import User from '../models/user';
import Admin from '../models/admin';

// регистрация
export const signup = async (req, res, next) => {
  const userId = req.token._id; // id пользователя по токену из заголовка

  const credentials = req.body; // данные из формы
  let user;
  let admin;

  console.log(credentials);

  try {
    admin = await Admin.findOne({ _id: userId }); // получаем админа по id
  } catch ({ message }) {
    console.log(message);
  }

  if (admin.login === undefined) {
    res.status(403).send('Premission denided');
    return next();
  }

  if (!credentials.login || !credentials.password) {
    res.status(400).send('no data entered');
    return next();
  }

  if (credentials.login === 'admin') {
    res.status(400).send('login error');
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

// регистрация админа
export const regAdmin = async (req, res, next) => {
  const credentials = req.body; // данные из формы
  let user;

  console.log(credentials);

  if (!credentials.login || !credentials.password) {
    res.status(400).send('no data entered');
    return next();
  }

  try {
    user = await Admin.create(credentials); // создаём нового пользователя
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

// авторизация админа
export const adminSignin = async (req, res, next) => {
  console.log(req.body);

  const { login, password } = req.body;

  const user = await Admin.findOne({ login }); // ищем пользователя по логину

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
  res.json({ token }); // выдаём токен
};


import bcrypt from 'bcrypt';
import * as UserServices from '../services/UserService';
import * as AdminService from '../services/AdminService';
import User from '../models/user';
import Page from '../models/page';

export async function getCurrentUser(req, res, next) {
  const { token } = req;
  let user;

  try {
    user = await UserServices.getUserByToken(token); // получаем юзезра по id
  } catch ({ message }) {
    res.status(500).send(message);
    return next();
  }

  return res.json(user);
}

export async function getCurrentAdmin(req, res, next) {
  const { token } = req;
  let user;

  try {
    user = await AdminService.getAdminByToken(token); // получаем админа по id
  } catch ({ message }) {
    res.status(500).send(message);
    return next();
  }

  return res.json(user);
}

export async function getUserById(req, res, next) {
  const { id } = req.params;
  let user = {};

  const isValidId = id.match(/^[0-9a-fA-F]{24}$/);
  if (isValidId) {
    try {
      user = await User.findById(id, { password: 0 }); // получаем юзезра по id
    } catch ({ message }) {
      res.status(500).send(message);
      return next();
    }
  } else if (!isValidId) {
    user = await User.findOne({ login: id }, { password: 0 });
  } else {
    res.status(400).send('Id error');
  }

  if (user === null) {
    res.status(404).send('Not found');
  }

  return res.json(user);
}

export async function getUserByName(req, res, next) {
  const { name } = req.params;
  console.log(name);

  let user;

  try {
    user = await UserServices.getUserByName(name); // получаем юзезра по id
  } catch ({ message }) {
    res.status(500).send(message);
    return next();
  }

  return res.json(user);
}

export async function userbyFNameAndGroup(req, res, next) {
  const {
    name,
    surname,
    otchestvo,
    group,
  } = req.body;

  let user;

  const fullname = [name, surname, otchestvo].join(' ');

  console.log(fullname);

  try {
    user = await Page.findOne({ name: fullname, group }); // получаем юзезра по id
  } catch ({ message }) {
    res.status(500).send(message);
    return next();
  }

  return res.json(user);
}

// обработчик, проверяющий пользователя в базе данных
export async function checkUserByName(req, res, next) {
  const name = req.params.user;
  let userName;

  try {
    userName = await UserServices.getUserByName(name); // получаем юзезра по имени
  } catch ({ message }) {
    res.status(500).send(message);
    return next();
  }

  if (!userName[0]) {
    res.sendStatus(404);
  } else {
    next(); // запускаем следующий обработчик
  }
}

// Изменяем данные пользователя (логин/пароль)
export const editUser = async (req, res, next) => {
  const credentials = req.body; // данные из формы
  const userId = req.token._id; // id пользователя по токену из заголовка

  let user = await User.findOne({ _id: userId }); // ищем пользователя по id

  if (credentials.password) {
    try {
      const result = await user.comparePasswords(credentials.oldpassword); // сравниваем пароли

      if (!result) {
        res.status(400).send('Bad Creditials');
        return next();
      }
    } catch ({ message }) {
      res.status(400).send(message);
      return next();
    }
  }

  if (!user) {
    res.status(400).send('Not found');
    return next();
  }

  if (credentials.password) {
    const salt = await bcrypt.genSalt(10); // соль для хеша
    const hash = await bcrypt.hash(credentials.password, salt); // хеш
    credentials.password = hash;
  }

  try {
    user = await User.findOneAndUpdate({ _id: userId }, credentials);
  } catch ({ message }) {
    res.status(400).send(message);
    return next();
  }

  res.json({ message: 'success' }); // возвращаем пользоваетя
};

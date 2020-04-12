import * as UserServices from '../services/UserService';

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


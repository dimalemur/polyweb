import User from '../models/user';

export async function getUserByToken(token) {
  const { _id } = token;
  let user;

  // ищем пользователя по id, результат получаем без пароля
  try {
    user = await User.findOne({ _id }, { password: 0 });
  } catch (e) {
    throw e;
  }

  return user;
}

export async function getUserByName(login) {
  let user;
  // ищем пользователя по имени, результат получаем без пароля
  try {
    user = await User.find({ login }, { password: 0 });
  } catch (e) {
    throw e;
  }

  return user;
}

export async function getUserByFNameAndGroup(login) {
  let user;
  // ищем пользователя по имени, результат получаем без пароля
  try {
    user = await User.find({ login }, { password: 0 });
  } catch (e) {
    throw e;
  }

  return user;
}

import Admin from '../models/admin';

export async function getAdminByToken(token) {
  const { _id } = token;
  let user;

  // ищем пользователя по id, результат получаем без пароля
  try {
    user = await Admin.findOne({ _id }, { password: 0 });
  } catch (e) {
    throw e;
  }

  return user;
}

export async function getAdminByName(login) {
  let user;
  // ищем пользователя по имени, результат получаем без пароля
  try {
    user = await Admin.find({ login }, { password: 0 });
  } catch (e) {
    throw e;
  }

  return user;
}

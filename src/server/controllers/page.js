import Page from '../models/page';
import User from '../models/user';
import Grades from '../models/grades';
import SportVisits from '../models/sportVisits';
import Admin from '../models/admin';

// создать запись
export async function create(req, res, next) {
  const pageData = req.body;
  const userId = req.token._id;
  let page;
  let admin;

  try {
    admin = await Admin.findOne({ _id: userId }); // получаем админа по id
  } catch ({ message }) {
    console.log(message);
  }

  if (admin.login === undefined) {
    res.status(403).send('Premission denided');
    return next();
  }

  try {
    page = await Page.create(pageData);
  } catch ({ message }) {
    res.status(400).send(message);
    return next();
  }

  res.json(page);
}

// получить все записи
export async function getAll(req, res, next) {
  let pages;
  try {
    pages = await Page.find({});
  } catch ({ message }) {
    res.status(500).send(message);
    return next();
  }
  res.json({ pages });
}

// получить все имена
export async function getAllNames(req, res, next) {
  let pages;
  try {
    pages = await Page.find({}).select('name');
  } catch ({ message }) {
    res.status(500).send(message);
    return next();
  }
  res.json(pages);
}

// получить записи по пользователю
export async function getPagesByUserLogin(req, res, next) {
  const { login } = req.params;
  let user;
  let pages;
  let isOwner;

  try {
    user = await User.findOne({ login });
  } catch ({ message }) {
    res.status(500).send(message);
    return next();
  }

  if (!user) {
    res.status(404).send('User nor found');
    return next();
  }

  try {
    pages = await Page.find({ userId: user._id });
  } catch ({ message }) {
    res.status(500).send(message);
    return next();
  }

  if (pages[0] !== undefined) {
    isOwner = { isOwner: (pages[0].userId.toString() === req.token._id) ? 'true' : 'false' };
  }

  res.json({ userData: pages[0], isOwner });
}

// получить записи по id пользователя
export async function getPagesByUserId(req, res, next) {
  const { id } = req.params;
  let user;
  let pages;
  let isOwner;

  try {
    user = await User.findOne({ _id: id });
  } catch ({ message }) {
    res.status(500).send(message);
    return next();
  }

  if (!user) {
    res.status(404).send('User nor found');
    return next();
  }

  try {
    pages = await Page.find({ userId: user._id });
  } catch ({ message }) {
    res.status(500).send(message);
    return next();
  }

  if (pages[0] !== undefined) {
    isOwner = { isOwner: (pages[0].userId.toString() === req.token._id) ? 'true' : 'false' };
  }

  res.json({ userData: pages[0], isOwner });
}

// изменить запись
export async function editInfo(req, res, next) {
  const _id = req.params.id; // id записи (берется из параметров get)
  const userId = req.token._id;
  let pages;
  let admin;

  try {
    pages = await Page.findOne({ _id });
  } catch ({ message }) {
    res.status(500).send(message);
    return next();
  }

  if (!pages) {
    res.status(404).send('Page not found');
    return next();
  }

  try {
    admin = await Admin.findOne({ _id: userId }); // получаем админа по id
  } catch ({ message }) {
    console.log(message);
  }

  console.log(userId.toString());
  console.log(pages.userId.toString());
  console.log(admin);

  if (admin === null) {
    if (userId.toString() !== pages.userId.toString()) {
      res.status(403).send('Premission denided');
      return next();
    }
  }
  // если запись не плоьзователя

  try {
    await Page.findOneAndUpdate({ _id }, req.body);
  } catch ({ message }) {
    res.status(500).send(message);
    return next();
  }

  return res.json({ message: 'success' });
}

// Удалить приказ
export async function deleteOrder(req, res, next) {
  const { pageId, orderId } = req.body;
  const userId = req.token._id;
  let admin;

  try {
    admin = await Admin.findOne({ _id: userId }); // получаем админа по id
  } catch ({ message }) {
    console.log(message);
  }

  if (admin.login === undefined) {
    res.status(403).send('Premission denided');
    return next();
  }

  try {
    await Page.update({ _id: pageId }, { $pull: { orders: { _id: orderId } } });
  } catch ({ message }) {
    res.status(500).send('message');
    return next();
  }

  return res.json({ message: 'success' });
}

// Добавить приказ
export async function addOrder(req, res, next) {
  const { pageId, name, url } = req.body;
  const userId = req.token._id;
  let admin;

  try {
    admin = await Admin.findOne({ _id: userId }); // получаем админа по id
  } catch ({ message }) {
    console.log(message);
  }

  if (admin.login === undefined) {
    res.status(403).send('Premission denided');
    return next();
  }

  try {
    await Page.update({ _id: pageId }, { $push: { orders: { name, url } } });
  } catch ({ message }) {
    res.status(500).send('message');
    return next();
  }

  return res.json({ message: 'success' });
}

// Добавление записей оченок ученика
export async function addGrages(req, res, next) {
  const gradesData = req.body;
  const userId = req.token._id;
  let grades;

  gradesData.userId = userId;

  try {
    grades = await Grades.create(gradesData);
  } catch ({ message }) {
    res.status(400).send(message);
    return next();
  }
  res.json(gradesData);
}

// Получение записей оченок ученика
export async function getGrages(req, res, next) {
  const userId = req.token._id;
  const semester = req.query.semester; /* eslint prefer-destructuring:"Off" */
  let grades;

  if (semester) {
    try {
      grades = await Grades.find({ userId }, { userId: 0, '__v': 0 }).where('semester').equals(semester); /* eslint quote-props: "Off" */
    } catch ({ message }) {
      res.status(500).send(message);
      return next();
    }
  } else {
    try {
      grades = await Grades.find({ userId }, { userId: 0, '__v': 0 }); /* eslint quote-props: "Off" */
    } catch ({ message }) {
      res.status(500).send(message);
      return next();
    }
  }

  res.json(grades);
}

// Изменение оценок ученика
export async function editGrages(req, res, next) {
  const _id = req.params.gradesId; // id записи (берется из параметров get)
  const userId = req.token._id;
  let grades;

  try {
    grades = await Grades.findOne({ _id });
  } catch ({ message }) {
    res.status(500).send(message);
    return next();
  }

  if (!grades) {
    res.status(404).send('Page not found');
    return next();
  }

  // если запись не плоьзователя
  if (userId.toString() !== grades.userId.toString()) {
    res.status(403).send('Premission denided');
    return next();
  }

  try {
    await Grades.findOneAndUpdate({ _id }, req.body);
  } catch ({ message }) {
    res.status(500).send(message);
    return next();
  }

  return res.json({ message: 'success' });
}

// Удаление оценок ученика
export async function deleteGrages(req, res, next) {
  const _id = req.params.semestr; // id записи (берется из параметров get)
  const userId = req.token._id;
  let grades;

  try {
    grades = await Grades.findOne({ 'semester': _id });
  } catch ({ message }) {
    res.status(500).send(message);
    return next();
  }

  if (!grades) {
    res.status(404).send('Page not found');
    return next();
  }

  // если запись не плоьзователя
  if (userId.toString() !== grades.userId.toString()) {
    res.status(403).send('Premission denided');
    return next();
  }

  try {
    await grades.remove();
  } catch ({ message }) {
    res.status(500).send(message);
    return next();
  }

  return res.json({ message: 'success' });
}

// Добавление записей посещения физры
export async function addSportVisit(req, res, next) {
  const visitsData = req.body;
  const userId = req.token._id;
  let visits;

  visitsData.userId = userId;
  visitsData.countNeed = visitsData.visits.length;

  try {
    visits = await SportVisits.create(visitsData);
  } catch ({ message }) {
    res.status(400).send(message);
    return next();
  }
  res.json(visitsData);
}

// Изменение посещений по физре ученика
export async function editSportVisit(req, res, next) {
  const _id = req.params.visitId; // id записи (берется из параметров get)
  const userId = req.token._id;
  const visitsData = req.body;
  let visits;

  try {
    visits = await SportVisits.findOne({ _id });
  } catch ({ message }) {
    res.status(500).send(message);
    return next();
  }

  if (!visits) {
    res.status(404).send('Page not found');
    return next();
  }

  // если запись не плоьзователя
  if (userId.toString() !== visits.userId.toString()) {
    res.status(403).send('Premission denided');
    return next();
  }

  visitsData.countNeed = visitsData.visits.length;
  try {
    await SportVisits.findOneAndUpdate({ _id }, visitsData);
  } catch ({ message }) {
    res.status(500).send(message);
    return next();
  }

  return res.json({ message: 'success' });
}

// Получение записей посещений по физре ученика
export async function getSportVisit(req, res, next) {
  const userId = req.token._id;
  const semester = req.query.semester; /* eslint prefer-destructuring:"Off" */
  let grades;

  if (semester) {
    try {
      grades = await SportVisits.find({ userId }, { userId: 0, '__v': 0 }).where('semester').equals(semester); /* eslint quote-props: "Off" */
    } catch ({ message }) {
      res.status(500).send(message);
      return next();
    }
  } else {
    try {
      grades = await SportVisits.find({ userId }, { userId: 0, '__v': 0 }); /* eslint quote-props: "Off" */
    } catch ({ message }) {
      res.status(500).send(message);
      return next();
    }
  }

  res.json(grades);
}

// Удаление записей посещений по физре ученика
export async function deleteSportVisit(req, res, next) {
  const _id = req.params.semester; // id записи (берется из параметров get)
  const userId = req.token._id;
  let visits;

  try {
    visits = await SportVisits.findOne({ 'semester': _id });
  } catch ({ message }) {
    res.status(500).send(message);
    return next();
  }

  if (!visits) {
    res.status(404).send('Page not found');
    return next();
  }

  // если запись не плоьзователя
  if (userId.toString() !== visits.userId.toString()) {
    res.status(403).send('Premission denided');
    return next();
  }

  try {
    await visits.remove();
  } catch ({ message }) {
    res.status(500).send(message);
    return next();
  }

  return res.json({ message: 'success' });
}

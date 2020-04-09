import Page from '../models/page';
import User from '../models/user';
import Grades from '../models/grades';

// создать запись
export async function create(req, res, next) {
  const pageData = req.body;
  const userId = req.token._id;
  let page;

  pageData.userId = userId;

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

// изменить запись
export async function editInfo(req, res, next) {
  const _id = req.params.id; // id записи (берется из параметров get)
  const userId = req.token._id;
  let pages;

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

  // если запись не плоьзователя
  if (userId.toString() !== pages.userId.toString()) {
    res.status(403).send('Premission denided');
    return next();
  }

  try {
    await Page.findOneAndUpdate({ _id }, req.body);
  } catch ({ message }) {
    res.status(500).send(message);
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

  let grades;
  try {
    grades = await Grades.find({ userId }, { userId: 0, '__v': 0 }); /* eslint quote-props: "Off" */
  } catch ({ message }) {
    res.status(500).send(message);
    return next();
  }

  res.json(grades);
}

// Изменение оценок ученика
export async function editGrages(req, res, next) {
  const _id = req.params.gradesIs; // id записи (берется из параметров get)
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

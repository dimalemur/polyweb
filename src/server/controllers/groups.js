/* eslint-disable quotes */
import { db } from '../db/postgres';
import Admin from '../models/admin';

export const getAllGroups = async (req, res, next) => {
  let resoult;
  await db.any('SELECT * FROM groups')
    .then((data) => {
      resoult = data;
    })
    .catch((error) => {
      console.log('ERROR:', error);
    });
  return res.json(resoult);
};

export const addGroup = async (req, res, next) => {
  const { group } = req.body;
  let resoult;
  let newIndex;
  let admin;
  const userId = req.token._id;

  try {
    admin = await Admin.findOne({ _id: userId }); // получаем админа по id
  } catch ({ message }) {
    console.log(message);
  }

  if (admin.login === undefined) {
    res.status(403).send('Premission denided');
    return next();
  }

  await db.one('SELECT max(id_group) FROM groups;')
    .then((data) => {
      newIndex = data.max;
    })
    .catch((error) => {
      console.log('ERROR:', error);
    });

  await db.none(`insert into groups(id_group,group_number) values(${newIndex + 1},'${group}')`)
    .then((data) => {
      return res.json({ status: 'success' });
    })
    .catch((error) => {
      res.status(501).send(error);
    });

  return res.json(resoult);
};

/* eslint-disable quotes */
import { db } from '../db/postgres';
import Admin from '../models/admin';
import * as GroupServices from '../services/GroupService';

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
  const { group, semester } = req.body;
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

  await db.none(`insert into groups(id_group,group_number,semester) values(${newIndex + 1},'${group}','${semester}')`)
    .then((data) => res.json({ status: 'success' }))
    .catch((error) => {
      res.status(501).send(error);
    });

  return res.json(resoult);
};

export const getGroupInfo = async (req, res, next) => {
  const { group } = req.query;

  const groupId = await GroupServices.asyncGetGroupByText(group);
  const groupInfo = await GroupServices.asyncGetStudentsFullnameByGroupId(groupId.id_group);

  return res.json(groupInfo);
};

export const deleteFromGroups = async (req, res, next) => {
  const {
    name,
    surname,
    otchestvo,
    group,
  } = req.body;

  const idGroup = await GroupServices.asyncGetGroupByText(group);

  const studentId = await GroupServices.asyncGetStudentByFullNameAndGroupId(name, surname, otchestvo, idGroup.id_group);
  const deleteStatus = await GroupServices.asyncDeleteStudentFromGroupByUserId(studentId.id_sudent);

  return res.json(deleteStatus);
};

export const addFromGroups = async (req, res, next) => {
  const {
    name,
    surname,
    otchestvo,
    group,
  } = req.body;

  const idGroup = await GroupServices.asyncGetGroupByText(group);

  const addStatus = await GroupServices.asyncAddStudentFromGroup(name, surname, otchestvo, idGroup.id_group);

  return res.json(addStatus);
};

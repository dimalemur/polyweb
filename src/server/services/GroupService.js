import { db } from '../db/postgres';

export const asyncGetStudentsFullnameByGroupId = (groupId) => (
  db.any(`select name,surname,otchestvo from students where id_group = ${groupId}`)
    .then((data) => data)
    .catch((error) => error)
);

export const asyncGetGroupByText = (groupName) => (
  db.one(`select id_group from groups where group_number ='${groupName}'`)
    .then((data) => data)
    .catch((error) => error)
);

export const asyncGetStudentByFullNameAndGroupId = (name, surname, otchestvo, idGroup) => (
  db.one(`select id_sudent from students where id_group = ${idGroup} 
  and name ='${name}' 
  and surname = '${surname}' 
  and otchestvo =  '${otchestvo}'`)

    .then((data) => data)
    .catch((error) => error)
);

export const asyncDeleteStudentFromGroupByUserId = (studentId) => (
  db.none(`delete from students where id_sudent = ${studentId}`)
    .then(() => ({ status: 'success' }))
    .catch((error) => error)
);

export const asyncAddStudentFromGroup = async (name, surname, otchestvo, idGroup) => {
  const index = await db.one('select max(id_sudent) from students')
    .then((data) => data)
    .catch((error) => error);

  const status = await (
    db.none(`insert into students(id_sudent,id_group,name,surname,otchestvo) values 
  (${index.max + 1}, ${idGroup},'${name}','${surname}','${otchestvo}')`)

      .then(() => ({ status: 'success' }))
      .catch((error) => error)
  );

  return status;
};

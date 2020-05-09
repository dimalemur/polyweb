import React from 'react';

export const Editgroupcontainer = (Component) => {
  const asyncDeleteStudentFromGroup = (token, name, surname, otchestvo, group) => {
    fetch('/api/deletefromgroups', {
      credentials: 'same-origin',
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        authorization: token,
      }),
      body: JSON.stringify({
        name,
        surname,
        otchestvo,
        group,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  const asyncAddStudentFromGroup = (token, name, surname, otchestvo, group) => {
    fetch('/api/addfromgroups', {
      credentials: 'same-origin',
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        authorization: token,
      }),
      body: JSON.stringify({
        name,
        surname,
        otchestvo,
        group,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  };
  return <Component asyncDeleteStudentFromGroup={asyncDeleteStudentFromGroup} asyncAddStudentFromGroup={asyncAddStudentFromGroup} />;
};

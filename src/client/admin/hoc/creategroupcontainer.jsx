import React from 'react';

export const Creategroupcontainer = (Component) => {
  const asyncAddStudentInfo = (token, group, semester) => {
    fetch('/api/addgroup', {
      credentials: 'same-origin',
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        authorization: token,
      }),
      body: JSON.stringify({ group, semester }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  };
  return <Component asyncAddStudentInfo={asyncAddStudentInfo} />;
};

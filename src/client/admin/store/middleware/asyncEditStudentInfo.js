import { asyncGetStudent } from './asyncGetStudent';

export const asyncEditStudentData = (token, id, userId, newData) => (dispatch) => {
  fetch(`/api/info/${id}`, {
    credentials: 'same-origin',
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      authorization: token,
    }),
    body: JSON.stringify(newData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      dispatch(asyncGetStudent(token, userId));
    })
    .catch((error) => console.log(error));
};

export const asyncDeleteStudentOrdersData = (token, userId, pageId, orderId) => (dispatch) => {
  fetch('/api/info/deleteorder', {
    credentials: 'same-origin',
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      authorization: token,
    }),
    body: JSON.stringify({ pageId, orderId }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      dispatch(asyncGetStudent(token, userId));
    })
    .catch((error) => console.log(error));
};

export const asyncAddStudentOrdersData = (token, userId, pageId, name, url) => (dispatch) => {
  fetch('/api/info/addorder', {
    credentials: 'same-origin',
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      authorization: token,
    }),
    body: JSON.stringify({ pageId, name, url }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      dispatch(asyncGetStudent(token, userId));
    })
    .catch((error) => console.log(error));
};

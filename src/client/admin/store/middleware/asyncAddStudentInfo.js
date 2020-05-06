import { asyncGetStudent } from './asyncGetStudent';

export const asyncAddStudentInfo = (token, userId, studentInfo) => (dispatch) => {
  fetch('/api/info', {
    credentials: 'same-origin',
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      authorization: token,
    }),
    body: JSON.stringify(studentInfo),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      dispatch(asyncGetStudent(token, userId));
    })
    .catch((error) => console.log(error));
};

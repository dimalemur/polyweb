import { setStudent, setStudentData, setLoading } from '../reducers/studentsPageReducer';

export const asyncGetStudentData = (token, username) => (dispatch) => {
  fetch(`/api/info/${username}`, {
    credentials: 'same-origin',
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      authorization: token,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch(setStudentData(data.userData));
      dispatch(setLoading(false));
    })
    .catch((error) => {
      dispatch(setLoading(false));
      return console.log(error);
    });
};

export const asyncGetStudent = (token, userId) => (dispatch) => {
  fetch(`/api/userbyid/${userId}`, {
    credentials: 'same-origin',
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      authorization: token,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      dispatch(setStudent(data));
      dispatch(asyncGetStudentData(token, data.login));
    })
    .catch((error) => {
      dispatch(setStudent({}));
      dispatch(setStudentData({}));
      dispatch(setLoading(false));
      console.log(error);
    });
};

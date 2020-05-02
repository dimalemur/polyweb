import { asyncGetUser } from './asyncGetUser';
import { setSuccess } from '../reducers/profilePageReducer';

export const asyncEditUser = (token, newData) => (dispatch) => {
  dispatch(setSuccess('Подождите'));
  fetch('/api/edituser', {
    credentials: 'same-origin',
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: token,
    }),
    body: JSON.stringify(newData),
  })
    .then((response) => response.json())
    .then((message) => {
      if (message.message === 'success') {
        dispatch(asyncGetUser(token));
        dispatch(setSuccess('Изменено'));
      }
    })
    .catch((error) => {
      dispatch(setSuccess('Ошибка'));
      console.log(error);
    });
};

import { asyncGetUserData } from './asyncGetUser';
import { setSuccess } from '../reducers/profilePageReducer';

export const asyncEditUserInfoData = (token, username, pageId, newData) => (dispatch) => {
  dispatch(setSuccess('Подождите'));
  fetch(`/api/info/${pageId}`, {
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
        dispatch(asyncGetUserData(token, username));
        dispatch(setSuccess('Сохранено'));
      }
    })
    .catch((error) => {
      dispatch(setSuccess('Ошибка'));
      console.log(error);
    });
};

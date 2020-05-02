import { setUser } from '../reducers/mainPageReducer';
import { setUserData } from '../reducers/profilePageReducer';

export const asyncGetUser = (token) => (dispatch) => {
  fetch('/api/current-user', {
    credentials: 'same-origin',
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      authorization: token,
    }),
  })
    .then((response) => {
      if (response.status === 400) {
        throw new Error('User not found');
      }
      return response.json();
    })
    .then((user) => {
      window.localStorage.setItem('polyUser', token); // записываем токен в localStorage
      dispatch(setUser(user));
    })
    .catch((error) => console.log(error));
};

export const asyncAuth = (login, password) => (dispatch) => {
  fetch('/api/signin', {
    credentials: 'same-origin',
    method: 'POST',
    body: JSON.stringify({ login, password }),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  })
    .then((response) => response.json())
    .then((token) => { // получаем токен по введеному пользователю
      if (token.status === 200) {
        dispatch(asyncGetUser(token.token)); // диспатчем asyncGetUser
      }
    })
    .catch((error) => console.log(error));
};

// получаем данные о пользователе и статуд доступа к странице
export const asyncGetUserData = (token, name) => (dispatch) => {
  fetch(`/api/info/${name}`, {
    credentials: 'same-origin',
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      authorization: token,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch(setUserData(data));
    })
    .catch((error) => console.log(error));
};

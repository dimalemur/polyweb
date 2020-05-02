import { setUser } from '../reducers/mainPageReducer';

export const asyncGetUser = (token) => (dispatch) => {
  fetch('/api/current-admin', {
    credentials: 'same-origin',
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      authorization: token,
    }),
  })
    .then((response) => response.json())
    .then((user) => {
      window.localStorage.setItem('polyAdmin', token);
      dispatch(setUser(user));
    })
    .catch((error) => {
      console.log(error);
    });
};
export const asyncAuth = (login, password) => (dispatch) => {
  fetch('/api/admin/signin', {
    credentials: 'same-origin',
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({ login, password }),
  })
    .then((response) => response.json())
    .then((token) => {
      dispatch(asyncGetUser(token.token));
    })
    .catch((error) => {
      console.log(error);
    });
};

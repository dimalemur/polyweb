import { setUser, setUserData } from '../reducers/mainPageReducer';
import {store} from '../'

export const asyncGetUser = token => dispatch => {
    fetch('/api/current-user', {
        credentials: 'same-origin',
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          'authorization': token
        }),
      })
      .then(response => response.json())
      .then(user => {
        window.localStorage.setItem('polyUser',token); // записываем токен в localStorage
        dispatch(setUser(user));
        console.log(user);
      })
      .catch(error => console.log('error'))
};

// получаем данные о пользователе и статуд доступа к странице
export const asyncGetUserData = (token,name) => dispatch => {
  fetch(`/api/info/${name}`, {
      credentials: 'same-origin',
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': token
      }),
    })
    .then(response => response.json())
    .then(data => {
        dispatch(setUserData(data));
    })
    .catch(error => console.log(error))
};

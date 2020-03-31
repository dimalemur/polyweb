import { setUser } from '../reducers/mainPageReducer';
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
      })
      .catch(error => console.log(error))
};
import { setGroups } from '../reducers/groupsPageReducer';

export const asyncGetGroups = (token) => (dispatch) => {
  fetch('/api/allgroups', {
    credentials: 'same-origin',
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      authorization: token,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch(setGroups(data));
    })
    .catch((error) => {
      console.log(error);
    });
};

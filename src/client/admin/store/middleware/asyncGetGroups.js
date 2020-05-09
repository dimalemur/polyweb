import { setGroups, setGrouptData } from '../reducers/groupsPageReducer';

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

export const asyncGetGroupInfo = (token, group) => (dispatch) => {
  fetch(`/api/getgroupinfo?group=${group}`, {
    credentials: 'same-origin',
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      authorization: token,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch(setGrouptData({ groupName: group, groupStudents: data }));
    })
    .catch((error) => {
      console.log(error);
    });
};


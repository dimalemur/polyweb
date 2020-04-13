import { setUserGrades, setLoader } from '../reducers/gradesPageReducer';

export const asyncGetGrades = (token, semester) => (dispatch) => {
  dispatch(setLoader());
  const serchingSemester = (semester !== 0) ? `?semester=${semester}` : '';
  fetch(`/api/getgrades${serchingSemester}`, {
    credentials: 'same-origin',
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: token,
    }),
  })
    .then((response) => {
      if (response.status === 400) {
        throw new Error('User not found');
      }
      return response.json();
    })
    .then((data) => {
      if (data) {
        dispatch(setUserGrades(data));
      }
      dispatch(setLoader());
    })
    .catch((error) => console.log(error));
};

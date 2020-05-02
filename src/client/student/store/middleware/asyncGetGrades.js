import { setUserGrades, setGradesLoader } from '../reducers/gradesPageReducer';

export const asyncGetGrades = (token, semester) => (dispatch) => {
  dispatch(setGradesLoader());
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
      dispatch(setGradesLoader());
    })
    .catch((error) => console.log(error));
};

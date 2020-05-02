import { setUserVisits, setVisitsLoader } from '../reducers/sportPageReducer';

export const asyncGetSportVisits = (token, semester) => (dispatch) => {
  dispatch(setVisitsLoader());
  const serchingSemester = (semester !== 0) ? `?semester=${semester}` : '';
  fetch(`/api/getsportvisit${serchingSemester}`, {
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
        dispatch(setUserVisits(data));
      }
      dispatch(setVisitsLoader());
    })
    .catch((error) => console.log(error));
};

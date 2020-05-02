import { setTimeTable } from '../reducers/timetablePageReducer';

export const asyncGetTimetable = (token, group) => (dispatch) => {
  fetch(`/api/timetable?group=${group}`, {
    credentials: 'same-origin',
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      authorization: token,
    }),
  })
    .then((response) => response.json())
    .then((rasp) => {
      dispatch(setTimeTable(rasp));
    })
    .catch((error) => console.log(error));
};

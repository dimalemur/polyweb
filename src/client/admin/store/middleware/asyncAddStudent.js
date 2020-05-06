export const asyncAddStudentInfo = (token, login, password) => (dispatch) => {
  fetch('/api/signup', {
    credentials: 'same-origin',
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      authorization: token,
    }),
    body: JSON.stringify({ login, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log(error));
};

export const initialState = {
  user: {},
};

const SET_USER = 'SET_USER';
const LOG_OUT = 'LOG_OUT';

export const mainPageReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case SET_USER:
      newState = { ...state };
      newState.user = action.user;
      return newState;

    case LOG_OUT:
      window.localStorage.setItem('polyAdmin', null);
      return initialState;

    default:
      return state;
  }
};

export const setUser = (user) => ({ type: SET_USER, user });
export const logOut = () => ({ type: LOG_OUT });

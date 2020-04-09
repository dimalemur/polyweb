import { initialState } from '../initialState';

const SET_USER = 'SET_USER';
const SET_USER_DATA = 'SET_USER_DATA';
const LOG_OUT = 'LOG_OUT';

export const mainPageReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case SET_USER:
      newState = { ...state };
      newState.user = action.user;
      return newState;

    case SET_USER_DATA:
      newState = { ...state };
      newState.userData = action.userData.userData;
      newState.isOwner = action.userData.isOwner;
      return newState;

    case LOG_OUT:
      newState = { ...state };
      newState = initialState;
      window.localStorage.setItem('polyUser', null);
      return newState;

    default:
      return state;
  }
};

export const setUser = (user) => ({ type: SET_USER, user });
export const setUserData = (userData) => ({ type: SET_USER_DATA, userData });
export const logOut = () => ({ type: LOG_OUT });

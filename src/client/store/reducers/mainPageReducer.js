import { initialState } from '../initialState';

const SET_USER = 'SET_USER';
const SET_USER_DATA = 'SET_USER_DATA';
const LOG_OUT = 'LOG_OUT';
const SET_MENU_VISIBLE = 'SET_MENU_VISIBLE';
const SET_USER_GRADES = 'SET_USER_GRADES';
const SET_LOADER = 'SET_LOADER';

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

    case SET_USER_GRADES:
      newState = { ...state };
      newState.userGrades = action.userGrades;
      return newState;

    case LOG_OUT:
      newState = { ...state };
      newState = initialState;
      window.localStorage.setItem('polyUser', null);
      return newState;

    case SET_MENU_VISIBLE:
      newState = { ...state };
      newState.pagesState.menuVisible = !newState.pagesState.menuVisible;
      return newState;

    case SET_LOADER:
      newState = { ...state };
      newState.pagesState.loader = !newState.pagesState.loader;
      return newState;

    default:
      return state;
  }
};

export const setMenuVisible = () => ({ type: SET_MENU_VISIBLE });
export const setLoader = () => ({ type: SET_LOADER });
export const setUser = (user) => ({ type: SET_USER, user });
export const setUserData = (userData) => ({ type: SET_USER_DATA, userData });
export const setUserGrades = (userGrades) => ({ type: SET_USER_GRADES, userGrades });
export const logOut = () => ({ type: LOG_OUT });

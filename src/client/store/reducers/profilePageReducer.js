export const initialState = {
  userData: {
    orders: [],
  },
  isOwner: false,
  success: {
    isActive: null,
    text: '',
  },
};

const SET_USER_DATA = 'SET_USER_DATA';
const LOG_OUT = 'LOG_OUT';
const SET_SUCCESS = 'SET_SUCCESS';

export const profilePageReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
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

    case SET_SUCCESS:
      newState = { ...state };
      newState.success.isActive = !newState.success.isActive;
      newState.success.text = action.text;
      return newState;

    default:
      return state;
  }
};

export const setUserData = (userData) => ({ type: SET_USER_DATA, userData });
export const logOutProfile = () => ({ type: LOG_OUT });
export const setSuccess = (text) => ({ type: SET_SUCCESS, text });

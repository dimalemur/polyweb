export const initialState = {
  userData: {
    orders: [],
  },
  isOwner: true,
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

      if (Object.keys(action.userData).length === 0) {
        return initialState;
      }
      newState.userData = action.userData.userData;
      newState.isOwner = JSON.parse(action.userData.isOwner.isOwner);
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

export const initialState = {
  user: {},
  pagesState: {
    menuVisible: false,
  },
};

const SET_USER = 'SET_USER';
const SET_MENU_VISIBLE = 'SET_MENU_VISIBLE';
const LOG_OUT = 'LOG_OUT';

export const mainPageReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case SET_USER:
      newState = { ...state };
      newState.user = action.user;
      return newState;

    case SET_MENU_VISIBLE:
      newState = { ...state };
      newState.pagesState.menuVisible = !newState.pagesState.menuVisible;
      return newState;

    case LOG_OUT:
      newState = { ...state };
      newState = initialState;
      return newState;

    default:
      return state;
  }
};

export const setMenuVisible = () => ({ type: SET_MENU_VISIBLE });
export const setUser = (user) => ({ type: SET_USER, user });
export const logOutPage = () => ({ type: LOG_OUT });

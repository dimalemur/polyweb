export const initialState = {
  userGrades: [],
  pagesState: {
    loader: false,
  },
};

const SET_USER_GRADES = 'SET_USER_GRADES';
const SET_GRADES_LOADER = 'SET_GRADES_LOADER';
const LOG_OUT = 'LOG_OUT';

export const gradesPageReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case SET_USER_GRADES:
      newState = { ...state };
      newState.userGrades = action.userGrades;
      return newState;

    case SET_GRADES_LOADER:
      newState = { ...state };
      newState.pagesState.loader = !newState.pagesState.loader;
      return newState;

    case LOG_OUT:
      newState = { ...state };
      newState = initialState;
      return newState;

    default:
      return state;
  }
};

export const setGradesLoader = () => ({ type: SET_GRADES_LOADER });
export const setUserGrades = (userGrades) => ({ type: SET_USER_GRADES, userGrades });
export const logOutGrades = () => ({ type: LOG_OUT });

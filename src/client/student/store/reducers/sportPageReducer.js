export const initialState = {
  userVisits: [],
  pagesState: {
    loader: false,
  },
};

const SET_USER_VISITS = 'SET_USER_VISITS';
const SET_VISITS_LOADER = 'SET_VISITS_LOADER';
const LOG_OUT = 'LOG_OUT';

export const sportPageReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case SET_USER_VISITS:
      newState = { ...state };
      newState.userVisits = action.userVisits;
      return newState;

    case SET_VISITS_LOADER:
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

export const setVisitsLoader = () => ({ type: SET_VISITS_LOADER });
export const setUserVisits = (userVisits) => ({ type: SET_USER_VISITS, userVisits });
export const logOutGrades = () => ({ type: LOG_OUT });

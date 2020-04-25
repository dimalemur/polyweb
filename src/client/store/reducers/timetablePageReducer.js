export const initialState = {
  timetable: {},
};

const SET_TIMETABLE = 'SET_TIMETABLE';

export const timetablePageReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case SET_TIMETABLE:
      newState = { ...state };
      newState.timetable = action.timetable;
      return newState;
    default:
      return state;
  }
};

export const setTimeTable = (timetable) => ({ type: SET_TIMETABLE, timetable });

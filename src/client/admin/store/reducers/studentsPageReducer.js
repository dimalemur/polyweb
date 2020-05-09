export const initialState = {
  student: {},
  studentData: {},
  pageModeComponent: null,
  mode: null,
  loading: false,
};

const SET_STUDENT = 'SET_STUDENT';
const SET_STUDENT_DATA = 'SET_STUDENT_DATA';
const SET_PAGE_MODE = 'SET_PAGE_MODE';
const SET_LOADING = 'SET_LOADING';

export const studentPageReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case SET_STUDENT:
      newState = { ...state };
      newState.student = action.student;
      return newState;
    case SET_STUDENT_DATA:
      newState = { ...state };
      newState.studentData = action.studentData;
      return newState;
    case SET_PAGE_MODE:
      newState = { ...state };
      newState.pageModeComponent = action.component;
      newState.mode = action.mode;
      return newState;
    case SET_LOADING:
      newState = { ...state };
      newState.loading = action.val;
      return newState;

    default:
      return state;
  }
};

export const setPageMode = (component, mode) => ({ type: SET_PAGE_MODE, component, mode });
export const setStudent = (student) => ({ type: SET_STUDENT, student });
export const setLoading = (val) => ({ type: SET_LOADING, val });
export const setStudentData = (studentData) => ({ type: SET_STUDENT_DATA, studentData });

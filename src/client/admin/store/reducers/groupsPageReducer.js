export const initialState = {
  groups: [],
  groupData: {},
  mode: null,
  loading: false,
};

const SET_GROUPS = 'SET_GROUPS';
const SET_GROUP_DATA = 'SET_GROUP_DATA';
const SET_PAGE_GROUP_MODE = 'SET_PAGE_GROUP_MODE';
const SET_GROUP_LOADING = 'SET_GROUP_LOADING';

export const groupPageReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case SET_GROUPS:
      newState = { ...state };
      newState.groups = action.groups;
      console.log(action.groups);
      return newState;
    case SET_GROUP_DATA:
      newState = { ...state };
      newState.groupData = action.groupData;
      return newState;
    case SET_PAGE_GROUP_MODE:
      newState = { ...state };
      newState.mode = action.mode;
      return newState;
    case SET_GROUP_LOADING:
      newState = { ...state };
      newState.loading = action.val;
      return newState;

    default:
      return state;
  }
};

export const setGroups = (groups) => ({ type: SET_GROUPS, groups });
export const setGrouptData = (groupData) => ({ type: SET_GROUP_DATA, groupData });
export const setPageMode = (mode) => ({ type: SET_PAGE_GROUP_MODE, mode });
export const setLoading = (val) => ({ type: SET_GROUP_LOADING, val });

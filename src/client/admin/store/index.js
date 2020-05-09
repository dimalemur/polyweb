import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { mainPageReducer } from './reducers/mainPageReducer';
import { studentPageReducer } from './reducers/studentsPageReducer';
import { groupPageReducer } from './reducers/groupsPageReducer';

const reducers = combineReducers({
  mainAdminPage: mainPageReducer,
  studentPage: studentPageReducer,
  groupsPage: groupPageReducer,
});

export const adminStore = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

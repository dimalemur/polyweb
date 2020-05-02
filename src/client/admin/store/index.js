import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { mainPageReducer } from './reducers/mainPageReducer';
import { srudentPageReducer } from './reducers/studentsPageReducer';

const reducers = combineReducers({
  mainAdminPage: mainPageReducer,
  studentPage: srudentPageReducer,
});

export const adminStore = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { mainPageReducer } from './reducers/mainPageReducer';
import { profilePageReducer } from './reducers/profilePageReducer';
import { gradesPageReducer } from './reducers/gradesPageReducer';
import { sportPageReducer } from './reducers/sportPageReducer';

const reducers = combineReducers({
  mainPage: mainPageReducer,
  profilePage: profilePageReducer,
  gradesPage: gradesPageReducer,
  sportVisitsPage: sportPageReducer,
});

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

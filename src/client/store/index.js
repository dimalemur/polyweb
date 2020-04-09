import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { mainPageReducer } from './reducers/mainPageReducer';

const reducers = combineReducers({
  AuthPage: mainPageReducer,
});

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

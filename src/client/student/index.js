import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './app';
import { store } from './store';

export const User = () => (
  <Provider store={store} >
    <BrowserRouter >
      <App />
    </BrowserRouter>
  </Provider>
);

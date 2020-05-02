import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import AdminApp from './app';
import { adminStore } from './store';

export const Admin = () => (
  <Provider store={adminStore} >
    <BrowserRouter >
      <AdminApp />
    </BrowserRouter>
  </Provider>
);

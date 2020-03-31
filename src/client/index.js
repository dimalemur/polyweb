import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { asyncGetUser } from './store/middleware/asyncGetUser';
import App from './app';

import { Provider } from 'react-redux'
import { store } from './store'


const token = window.localStorage.getItem('polyUser'); 
store.dispatch(asyncGetUser(token))



ReactDom.render(
    <Provider store = { store } >
        <BrowserRouter >
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('Page')
)
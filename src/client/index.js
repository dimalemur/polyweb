import React from 'react';
import ReactDom from 'react-dom';

import { Admin } from './admin';
import { User } from './student';

ReactDom.render(
  (window.location.pathname.split('/')[1] === 'admin')
    ? <Admin />
    : <User />,
  document.getElementById('Page'),
);


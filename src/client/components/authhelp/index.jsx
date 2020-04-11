import React from 'react';
import './authhelp.pcss';
import arrow from '../../../source/images/icons/arrow.svg';

export const Authhelp = (props) => (
  <div className='Authorization-Wrap'>
      <div className='Authhelp Authorization'>
        <div className='Question'>
          <span className='Question-Text'>
            Не знаете свой логин или пароль?
          </span>
          <div className='Question-Icon'>
            <img src={arrow} alt=''/>
          </div>
        </div>
        <hr/>
        <div className='Question'>
          <span className='Question-Text'>
            Забыли данные для входа?
          </span>
          <div className='Question-Icon'>
            <img src={arrow} alt=''/>
          </div>
        </div>
      </div>
    </div>
);

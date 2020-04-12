import React from 'react';
import './regcontent.pcss';
import { Switch, Route } from 'react-router-dom';
import computerIcon from '../../../source/images/programmer.svg';
import line from '../../../source/images/Vector 1.svg';
import Authorization from '../authorization';
import { Authhelp } from '../authhelp';
import Regnavbar from '../regnavbar';

export const Regcontent = (props) => (
  <div className='Regcontent' >
    <Regnavbar />
    <Switch>
      <Route exact path='/login/authhelp/' component={Authhelp} />
      <Route path='*' component={Authorization} />
    </Switch>
    <img className='Regcontent-Programmer' src={computerIcon} alt='' />
    <div className='Line-Wrap'>
      <div className='Img-Wrap'>
        <img className='Regcontent-Line' src={line} alt='' />
      </div>
    </div>
  </div>
);

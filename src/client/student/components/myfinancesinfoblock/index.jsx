import React from 'react';
import './myfinancesinfoblock.pcss';
import { Hostelinfo } from '../hostelinfo';

export const Myfinancesinfoblock = (props) => (
  <div className='Myfinancesinfoblock'>
    <div className='Changeditemcomponent Mxyfinances-Changeditemcomponent'>
      <Hostelinfo changededMode={props.changededMode} id={0} />
      <div className='Changeditemcomponent-Contacts'>
        По вопросам, связанным с оплатой обучения и отображением информации в личном кабинете, обращайтесь в <span>договорной отдел</span>.
    </div>
    </div>
  </div>
);

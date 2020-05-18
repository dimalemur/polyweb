import React from 'react';
import './hostelinfo.pcss';

export const Hostelinfo = (props) => {
  const { id } = props;
  return (id !== props.changededMode) ? '' : (
    <div className='Hostelinfo'>
      <div className='Hostelinfo-Title'>
        Договор найма <b>№456654</b> от 24.08.2018
      </div>
      <div className='Payment-Wrap'>
        <div className='Hostelinfo-Payment'>
          <div className='Payment-Totalamount Payment-Item'>
            <span className='Name Totalamount-Name'>
              Общая сумма договора:
          </span>
            <span className='Val Totalamount-Val'>
              45 000 руб.
          </span>
          </div>

          <div className='Payment-Debt Payment-Item'>
            <span className='Name Debt-Name'>
              Задолженность на 16.04.2020:
          </span>
            <span className='Val Val_red Debt-Val'>
              450 руб.
          </span>
          </div>

          <div className='Payment-Date Payment-Item'>
            <span className='Name Date-Name'>
              Плановая дата платежа:
          </span>
            <span className='Val Val_red Date-Val'>
              10.05.2020г.
          </span>
          </div>

          <div className='Payment-Left Payment-Item'>
            <span className='Name Left-Name'>
              Осталось оплатить:
          </span>
            <span className='Val Left-Val'>
              16 666 руб. (без учета индексации)
          </span>
          </div>
        </div>

      </div>
    </div>
  );
};

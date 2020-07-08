import React from 'react';
import './hostelinfo.pcss';

export const Hostelinfo = (props) => {
  const [isVisiblePayinfo, setVisiblePayinfo] = React.useState(false);
  const { id } = props;
  return (id !== props.changededMode) ? '' : (
    <div className='Hostelinfo Payment-Content'>
      <div className='Hostelinfo-Title'>
        Договор найма <b>№456654</b> от 24.08.2018
      </div>

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
      <div className='Hostelinfo-Text'>
        <b>Поступившие платежи</b>
      </div>
      <div className='Hostelinfo-Period'>
        <span>Период с</span>
        <input type='date' id='dateFor' placeholder='Выберите дату' />
        <span>по</span>
        <input type='date' id='dateTo' placeholder='Выберите дату' />
        <button className='Period-Button Button-Blue' onClick={() => { setVisiblePayinfo(!isVisiblePayinfo); }}>Показать</button>
      </div>
      <div className={`Hostelinfo-Payinfo Payinfo-Visible_${isVisiblePayinfo}`}>
        <div className='Payinfo-Inner'>
          <div className='Payinfo-Title'>
            <span>Дата платежа</span>
            <span>Сумма</span>
          </div>
          <div className='Payinfo-Item'>
            <span>
              10.01.2020г.
            </span>
            <span className='Payinfo-Isbigdisp'>
              ..............................................
            </span>
            <span>
              800 руб.
            </span>
          </div>
          <div className='Payinfo-Item'>
            <span>
              02.03.2020г.
            </span>
            <span className='Payinfo-Isbigdisp'>
              ..............................................
            </span>
            <span>
              800 руб.
            </span>
          </div>
          <div className='Payinfo-Item'>
            <span>
              22.03.2020г.
            </span>
            <span className='Payinfo-Isbigdisp'>
              ..............................................
            </span>
            <span>
              800 руб.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

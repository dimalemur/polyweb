import React, { useEffect, useState } from 'react';
import './modalsertificates.pcss';

export const Modalsertificates = (props) => (
  <div className={`Modalsertificates Modalsertificates_visible_${props.isOpenDialog}`}>
    <div className='Content-Exitbutton'><span onClick={(e) => { props.setOpenDialog(false); }}>X</span></div>

    <div className='Modalsertificates-Content'>
      <div className='Modalsertificates-Title'>
        Справка о прослушанных дисциплинах за период обучения (справка об обучении)
      </div>

      <div className='Modalsertificates-Forminp'>
        <div className='Forminp-Title'>
          Контактные данные
        </div>
        <div className='Forminp-Inpcontent'>
          <div className='Inpcontent-Form'>
            <label htmlFor='telephone'>Телефон</label>
            <input type='text' id='telephone' />
          </div>
          <div className='Inpcontent-Form'>
            <label htmlFor='mail'>E-mail</label>
            <input type='text' id='mail' />
          </div>
        </div>
      </div>

      <div className='Modalsertificates-Forminp'>
        <div className='Forminp-Title'>
          Прошу выдать мне справку об обучении в связи с:
        </div>
        <div className='Forminp-Inpcontent'>
          <form >
            <div className='Inpcontent-Radio'>
              <div className='Radio-Lbl'>
                <input name='type1' type='radio' id='rd1' />
                <label htmlFor='rd1'> моим письменным заявлением</label>
              </div>
              <div className='Radio-Lbl'>
                <input name='type1' type='radio' id='rd2' />
                <label htmlFor='rd2'> отчислением из вуза</label>
              </div>
            </div>
          </form>

          <div className='Inpcontent-Form'>
            <label htmlFor='telephone'>Телефон</label>
            <input type='text' id='telephone' />
          </div>
          <div className='Inpcontent-Form'>
            <label htmlFor='mail'>E-mail</label>
            <input type='text' id='mail' />
          </div>
        </div>
      </div>

      <div className='Modalsertificates-Forminp'>
        <div className='Forminp-Title'>
          Прошу выдать мне справку об обучении в связи с:
        </div>
        <div className='Forminp-Inpcontent'>
          <div className='Inpcontent-Radio'>
            <div className='Radio-Lbl'>
              <input name='type2' type='radio' id='rd3' />
              <label htmlFor='rd3'> аттестат о среднем (полном) общем образовании;</label>
            </div>
            <div className='Radio-Lbl'>
              <input name='type2' type='radio' id='rd4' />
              <label htmlFor='rd4'> диплом о среднем профессиональном образовании;</label>
            </div>

            <div className='Radio-Lbl'>
              <input name='type2' type='radio' id='rd5' />
              <label htmlFor='rd5'> диплом о начальном профессиональном образовании;</label>
            </div>

            <div className='Radio-Lbl'>
              <input name='type2' type='radio' id='rd6' />
              <label htmlFor='rd6'> академическая справка или диплом о неполном высшем образовании;</label>
            </div>

            <div className='Radio-Lbl'>
              <input name='type2' type='radio' id='rd7' />
              <label htmlFor='rd7'> диплом о полном высшем образовании;</label>
            </div>
          </div>
        </div>
      </div>

      <div className='Modalsertificates-Forminp'>
        <div className='Forminp-Title'>
          Данные о текущем месте обучения
        </div>
        <div className='Forminp-Inpcontent'>
          <div className='Inpcontent-Form'>
            <label htmlFor='name' id='Inp_long'>Название вуза</label>
            <input type='text' id='name' />
          </div>
          <div className='Inpcontent-Form'>
            <label htmlFor='year' id='Inp_long'>Год поступления </label>
            <input type='text' id='year' />
          </div>
        </div>
      </div>

      <div className='Modalsertificates-Success'>
        <button className = 'Success_gray'>Отправить заявку</button>
        <button className = 'Success_white'>Выбрать другой документ</button>
      </div>
    </div>
  </div >
);

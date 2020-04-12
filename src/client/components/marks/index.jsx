import React from 'react';
import './marks.pcss';
import { Regnavbar } from '../regnavbar';
import sector from '../../../source/images/sector.svg';
import wave from '../../../source/images/wave.svg';

export const Marks = (props) => (
    <div className={`Markscontent Markscontent-Menu${props.visible}`}>

      <Regnavbar activateMenu={props.activateMenu} visible={`_visible_${props.menuVisible}`} />

      <img className='Markscontent-Sector' src={sector} alt='' />
      <img className='Markscontent-Wave' src={wave} alt='' />

      <div className="Title Markscontent-Title">
        <span className="Title-Text">Академическая успеваемость</span>
        <span className="Title-Course">Курс</span>
      </div>

      <div className='Markscontent-Wrap'>
        <div className='Info Markscontent-Info'>

          <div className='Infoblock Personinfo Info-Personinfo'>
            <p className='Infoblock-Title Personinfo-Title' >
              Данные обучающегося
            </p>

            <div className='Personinfo-Content'>

              <div className='Personinfo-Name'>
                <p className='Infoline' > <b>Факультет : </b> </p>
                <p className='Infoline' > <b>Курс : </b> </p>
                <p className='Infoline' > <b>Группа : </b> </p>
                <p className='Infoline' > <b>Специальность : </b> </p>
                <p className='Infoline' > <b>Специализация : </b> </p>
                <p className='Infoline' > <b>Срок обучения : </b> </p>
                <p className='Infoline' > <b>Форма обучения : </b> </p>
                <p className='Infoline' > <b>Вид финансирования : </b> </p>
                <p className='Infoline' > <b>Уровень образования : </b> </p>
                <p className='Infoline' > <b>Год набора : </b> </p>
              </div>
              <div className='Personinfo-Value'>
                <p className='Infoline' > dfgdhgjvj </p>
                <p className='Infoline' > dfgdhgjvj </p>
                <p className='Infoline' > dfgdhgjvj </p>
                <p className='Infoline' > dfgdhgjvj </p>
                <p className='Infoline' > dfgdhgjvj </p>
                <p className='Infoline' > dfgdhgjvj </p>
                <p className='Infoline' > dfgdhgjvj </p>
                <p className='Infoline' > dfgdhgjvj </p>
                <p className='Infoline' > dfgdhgjvj</p>
                <p className='Infoline' > dfgdhgjvj </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
);

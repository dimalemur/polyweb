import React from 'react';
import './educprog.pcss';
import { Regnavbar } from '../regnavbar';

export const Educprog = (props) => (
    <div className={`Educprogcontent Educprogcontent-Menu${props.visible}`}>

      <Regnavbar activateMenu={props.activateMenu} visible={`_visible_${props.menuVisible}`} />

      <div className='Educprogcontent-Wrap'>
        <div className='Info Educprogcontent-Info'>

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

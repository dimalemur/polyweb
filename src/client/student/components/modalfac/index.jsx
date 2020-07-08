import React, { useEffect, useState } from 'react';
import './modalfac.pcss';

const vectors = [
  {
    title: '09.03.01 Информатика и вычислительная техника "Веб-технологии", 2017, очная',
    list: ['Учебный план',
      'Основная образовательная программа',
      'Матрица компетенций',
      'Рабочие программы дисциплин',
      'Справка МТО',
      'Справка о КО'],
    recens: ['Рецензии - 09.03.01 - 2016'],
    others: ['Справка НПР-практиках - 09.03.01 - 2017'],
  },
  {
    title: '09.03.02 Информационные системы и технологии "Веб-технологии", 2016, очная',
    list: ['Учебный план',
      'Основная образовательная программа',
      'Матрица компетенций',
      'Рабочие программы дисциплин',
      'Справка МТО',
      'Справка о КО'],
    recens: ['Рецензии - 09.03.01 - 2016'],
    others: ['Справка НПР-практиках - 09.03.01 - 2016'],
  },
];

const ModalfacVector = (props) => (
  <div className='Modalfac-Vector'>
    <div className='Vector-Title'>
      {props.vector.title}
    </div>
    {props.vector.list.map((el, i) => (
      <div className='Recens-Name' key={i}>
        {el}
      </div>
    ))}

    <div className='Title-Recens'>Рецензии:</div>
    {props.vector.recens.map((el, i) => (
      <div className='Recens-Name' key={i}>
        {el}
      </div>
    ))}

    <div className='Title-Recens'>Другие файлы:</div>
    {props.vector.others.map((el, i) => (
      <div className='Recens-Name' key={i}>
        {el}
      </div>
    ))}
  </div>
);

export const Modalfac = (props) => (
  <div className={`Modalfac Modalfac_visible_${props.isOpenDialog}`}>
    <div className='Content-Exitbutton'><span onClick={(e) => { props.setOpenDialog(false); }}>X</span></div>
    <div className='Modalfac-Content'>
      <div className='Title Modalfac-Title'>
        Факультет информационных технологий
        </div>

      {
        vectors.map((el, i) => (
          <ModalfacVector key={i} vector={el} />
        ))
      }
    </div>
  </div >
);

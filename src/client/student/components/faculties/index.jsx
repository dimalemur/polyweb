import React, { useEffect, useState } from 'react';
import './faculties.pcss';
import { connect } from 'react-redux';
import art from '../../../../source/images/icons/faculties/art.png';
import book from '../../../../source/images/icons/faculties/book.svg';
import camera from '../../../../source/images/icons/faculties/camera.svg';
import car from '../../../../source/images/icons/faculties/car.png';
import build from '../../../../source/images/icons/faculties/build.png';
import bag from '../../../../source/images/icons/faculties/bag.png';
import chembio from '../../../../source/images/icons/faculties/chembio.png';
import base from '../../../../source/images/icons/faculties/base.png';
import dollar from '../../../../source/images/icons/faculties/dollar.png';
import laptop from '../../../../source/images/icons/faculties/laptop.png';
import { asyncGetGrades } from '../../store/middleware/asyncGetGrades';
import { Modalfac } from '../modalfac';

const facsFirst = [
  {
    text: 'Институт графики и искусства книги имени В.А. Фаворовского',
    img: art,
  },
  {
    text: 'Институт издательского дела и журналистики',
    img: book,
  },
  {
    text: 'Институт принтмедиа и информационных технологий',
    img: camera,
  },
  {
    text: 'Транспортный факультет',
    img: car,
  },
];

const facsSecond = [
  {
    text: 'Факультет машиностроения',
    img: build,
  },
  {
    text: 'Факультет технологического предпринимательства',
    img: bag,
  },
  {
    text: 'Факультет химической технологии и биотехнологии',
    img: chembio,
  },
  {
    text: 'Факультет базовых компетенций',
    img: base,
  },
  {
    text: 'Факультет экономики и управления',
    img: dollar,
  },
  {
    text: 'Факультет информационных технологий',
    img: laptop,
  },
];

const Faculties = (props) => {
  const Regnav = props.Regnavbar;
  const [isOpenDialog, setOpenDialog] = useState(false);
  return (
    <div className='Faculties'>
      <Regnav />
      <div className='Faculties-Changesemester'>
        <span className='Faculties-Title'>Факультеты</span>
      </div>
      <div className='Faculties-Content'>
        <div className='Faculties-Inner'>

          <div className='Firstline'>
            {
              facsFirst.map((el, i) => (
                <div className='Faculty' key={i} onClick={(e) => { setOpenDialog(true); }}>
                  <img className='Faculty-Image' src={el.img}></img>
                  <span className='Faculty-Name'>{el.text}</span>
                </div>
              ))
            }
          </div>

          <div className='Secondline'>
            {
              facsSecond.map((el, i) => (
                <div className='Faculty' key={i} onClick={(e) => { setOpenDialog(true); }}>
                  <img className='Faculty-Image' src={el.img}></img>
                  <span className='Faculty-Name'>{el.text}</span>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <Modalfac isOpenDialog={isOpenDialog} setOpenDialog={setOpenDialog} />
    </div>
  );
};

export default connect(
  (state) => ({
    state,
    userData: state.profilePage.userData,
    userGrades: state.gradesPage.userGrades,
    course: state.profilePage.userData.course,
    loader: state.gradesPage.pagesState.loader,
  }),
  (dispatch) => ({
    asyncGetGrades: (token, semester = 0) => {
      dispatch(asyncGetGrades(token, semester));
    },
  }),
)(Faculties);

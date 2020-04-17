import React, { useEffect, useState } from 'react';
import './faculties.pcss';
import { connect } from 'react-redux';
import art from '../../../source/images/icons/faculties/art.png';
import book from '../../../source/images/icons/faculties/book.svg';
import camera from '../../../source/images/icons/faculties/camera.svg';
import car from '../../../source/images/icons/faculties/car.png';
import build from '../../../source/images/icons/faculties/build.png';
import bag from '../../../source/images/icons/faculties/bag.png';
import chembio from '../../../source/images/icons/faculties/chembio.png';
import base from '../../../source/images/icons/faculties/base.png';
import dollar from '../../../source/images/icons/faculties/dollar.png';
import laptop from '../../../source/images/icons/faculties/laptop.png';
import loader from '../../../source/images/icons/loader.png';
import { asyncGetGrades } from '../../store/middleware/asyncGetGrades';

const Faculties = (props) => {
  const Regnav = props.Regnavbar;

  return (
    <div className='Faculties'>
      <Regnav />
      <div className='Faculties-Changesemester'>
        <span className='Faculties-Title'>Факультеты</span>
      </div>
      <div className='Faculties-Content'>
        <div className="Faculties-Inner">
          <div className="Firstline">
            <div className="Faculty">
              <img className="Faculty-Image" src={art}></img>
              <span className="Faculty-Name">Институт графики и искусства книги имени В.А. Фаворовского</span>
            </div>
            <div className="Faculty">
              <img className="Faculty-Image" src={book}></img>
              <span className="Faculty-Name">Институт издательского дела и журналистики</span>
            </div>
            <div className="Faculty">
              <img className="Faculty-Image" src={camera}></img>
              <span className="Faculty-Name">Институт принтмедиа и информационных технологий</span>
            </div>
            <div className="Faculty">
              <img className="Faculty-Image" src={car}></img>
              <span className="Faculty-Name">Транспортный факультет</span>
            </div>
          </div>
          <div className="Secondline">
            <div className="Faculty">
              <img className="Faculty-Image" src={build}></img>
              <span className="Faculty-Name">Факультет машиностроения</span>
            </div>
            <div className="Faculty">
              <img className="Faculty-Image" src={bag}></img>
              <span className="Faculty-Name">Факультет технологического предпринимательства</span>
            </div>
            <div className="Faculty">
              <img className="Faculty-Image" src={chembio}></img>
              <span className="Faculty-Name">Факультет химической технологии и биотехнологии</span>
            </div>
            <div className="Faculty">
              <img className="Faculty-Image" src={base}></img>
              <span className="Faculty-Name">Факультет базовых компетенций</span>
            </div>
            <div className="Faculty">
              <img className="Faculty-Image" src={dollar}></img>
              <span className="Faculty-Name">Факультет экономики и управления</span>
            </div>
            <div className="Faculty">
              <img className="Faculty-Image" src={laptop}></img>
              <span className="Faculty-Name">Факультет информационных технологий</span>
            </div>
          </div>

        </div>
      </div>
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

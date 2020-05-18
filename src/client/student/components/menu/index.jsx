import React from 'react';
import './menu.pcss';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOutProfile } from '../../store/reducers/profilePageReducer';
import { logOutGrades } from '../../store/reducers/gradesPageReducer';
import { logOutPage, setMenuVisible } from '../../store/reducers/mainPageReducer';
import computerIcon from '../../../../source/images/icons/computer.svg';
import avatarIcon from '../../../../source/images/icons/ava.svg';
import settingsIcon from '../../../../source/images/icons/settings.svg';
import menuIcon from '../../../../source/images/icons/menu.svg';

const study = {
  id: 'Study',
  name: 'Учёба',
  links: [
    {
      name: 'Расписание',
      url: '/timetable',
    },
    {
      name: 'Успеваемость',
      url: '/performance',
    },
    {
      name: 'Посещения по физкультуре',
      url: '/visits',
    },
    {
      name: 'Образовательные программы',
      url: '/faculties',
    },
  ],
};

const career = {
  id: 'Career',
  name: 'Карьера',
  links: [
    {
      name: 'Дополнительные образовательные курсы',
      url: '/additional_courses',
    },
    {
      name: 'Трудоустройство и практика',
      url: '/practic',
    },
    {
      name: 'Международные стажировки',
      url: '/internship',
    },
  ],
};

const myFinances = {
  id: 'myFinances',
  name: 'Мои финансы',
  url: '/myfinances',
};

const certificates = {
  id: 'certificates',
  name: 'Справки',
  url: '/certificates',
};

const alerts = {
  id: 'alerts',
  name: 'Уведомления',
  url: '/alerts',
};

const feedback = {
  id: 'feedback',
  name: 'Обратная связь',
  url: '/feedback',
};

const links = [study, career, myFinances, certificates, alerts, feedback];
const Menu = (props) => {
  const logOut = (event) => {
    props.logOut();
  };

  return (
    <div className={`Menu Menu_visible_${props.menuVisible}`}>
      <div className='Userinfo Menu-Userinfo' >
        <NavLink to={`/${props.user}`} onClick={props.setMenuVisible} className='Userinfo-Icon'>
          <img src={avatarIcon} alt='Профиль' />
        </NavLink>
        <NavLink to={`/${props.user}`} onClick={props.setMenuVisible} className='Userinfo-Info' >
          <span className='Info-Text' >{props.state.profilePage.userData.name}</span>
        </NavLink>
      </div>

      <div>
        <button className='Menuicon Topicons-Menuicon' onClick={props.setMenuVisible} >
          <img src={menuIcon} alt='Меню' />
        </button>
      </div>

      <div className='Userlist Menu-Userlist'>
        <ul className='Userlist List'>
          {
            links.map((element, i) => (
              ('url' in element)
                ? (
                  <li className='List-Item' key={i} >
                    <NavLink to={`/${props.user}${element.url}`}>{element.name}</NavLink>
                  </li>
                ) : (
                  <li className='List-Item' key={i}>
                    <input type='checkbox' name='vkl' id={element.id} />
                    <label htmlFor={element.id}> {element.name} </label>

                    <ul className='Innerlist'>
                      {
                        element.links.map((el, j) => (
                          <li className='Innerlist-Initem' key={j}>
                            <NavLink to={`/${props.user}${el.url}`}>{el.name}</NavLink>
                          </li>
                        ))
                      }
                    </ul>
                  </li>
                )
            ))
          }
        </ul>
      </div>

      <button className='Signout Menu-Signout List-Item' onClick={logOut}>
        Выход
    </button>

      <div className='Settingicons Menu-Settingicons'>
        <NavLink to={`/${props.user}/settings`} className='Menuicon Settingicons-Setting' >
          <img src={settingsIcon} alt='Настройки' />
        </NavLink>

        <NavLink to='#' className='Menuicon Settingicons-Desktop' >
          <img src={computerIcon} alt='Компьютер' />
        </NavLink>
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    state,
    menuVisible: state.mainPage.pagesState.menuVisible,
  }),
  (dispatch) => ({
    setMenuVisible: () => {
      dispatch(setMenuVisible());
    },
    logOut: () => {
      dispatch(logOutProfile());
      dispatch(logOutPage());
      dispatch(logOutGrades());
    },
  }),
)(Menu);

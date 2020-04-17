import React from 'react';
import './menu.pcss';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { setMenuVisible } from '../../store/reducers/mainPageReducer';
import computerIcon from '../../../source/images/icons/computer.svg';
import avatarIcon from '../../../source/images/icons/ava.svg';
import settingsIcon from '../../../source/images/icons/settings.svg';
import menuIcon from '../../../source/images/icons/menu.svg';

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
      url: '/sportvisits',
    },
    {
      name: 'Образовательные программы',
      url: '/education',
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

const links = [study, career, 'Мои финансы', 'Справки', 'Уведомления', 'Обратная связь'];

const Menu = (props) => (
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
            (typeof element === 'string')
              ? <li className='List-Item' key={i} >
                <NavLink to='/'>{element}</NavLink>
              </li>
              : <li className='List-Item' key={i}>
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
          ))
        }
      </ul>
    </div>

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

export default connect(
  (state) => ({
    state,
    menuVisible: state.mainPage.pagesState.menuVisible,
  }),
  (dispatch) => ({
    setMenuVisible: () => {
      dispatch(setMenuVisible());
    },
  }),
)(Menu);

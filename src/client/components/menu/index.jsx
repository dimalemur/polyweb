import React from 'react';
import './menu.pcss';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { setMenuVisible } from '../../store/reducers/mainPageReducer';
import computerIcon from '../../../source/images/icons/computer.svg';
import avatarIcon from '../../../source/images/icons/ava.svg';
import settingsIcon from '../../../source/images/icons/settings.svg';
import menuIcon from '../../../source/images/icons/menu.svg';

const sublinks = {
  name: 'Учёба',
  links: [
    {
      name: 'Расписание',
      url: '/timetable',
    },
    {
      name: 'Успеваемость',
      url: '',
    },
    {
      name: 'Посещения по физкультуре',
      url: '',
    },
    {
      name: 'Образовательные программы',
      url: '',
    },
  ],
};

const links = [sublinks, 'Карьера', 'Мои финансы', 'Справки', 'Уведомления', 'Обратная связь'];

const Menu = (props) => (
  <div className={`Menu Menu_visible_${props.menuVisible}`}>
    <div className='Userinfo Menu-Userinfo' >
      <NavLink to={`/${props.user}`} onClick={props.setMenuVisible} className='Userinfo-Icon'>
        <img src={avatarIcon} alt='Профиль' />
      </NavLink>
      <NavLink to={`/${props.user}`} onClick={props.setMenuVisible} className='Userinfo-Info' >
        <span className='Info-Text' >{props.state.AuthPage.userData.name}</span>
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
              <NavLink onClick={props.setMenuVisible} to='/'>{element}</NavLink>
            </li>
            : <li className='List-Item' key={i}>
              <input type='checkbox' name='vkl' id='Study' />
              <label htmlFor='Study'> {element.name} </label>
              <ul className='Innerlist'>
                {
                  element.links.map((el, j) => (
                    <li className='Innerlist-Initem' key = {j}>
                      <NavLink onClick={props.setMenuVisible} to={`/${props.user}${el.url}`}>{el.name}</NavLink>
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
      <NavLink to='#' className='Menuicon Settingicons-Setting' >
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
    menuVisible: state.AuthPage.pagesState.menuVisible,
  }),
  (dispatch) => ({
    setMenuVisible: () => {
      dispatch(setMenuVisible());
    },
  }),
)(Menu);

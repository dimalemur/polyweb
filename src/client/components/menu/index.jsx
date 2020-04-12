import React from 'react';
import './menu.pcss';
import { NavLink } from 'react-router-dom';
import computerIcon from '../../../source/images/icons/computer.svg';
import avatarIcon from '../../../source/images/icons/ava.svg';
import settingsIcon from '../../../source/images/icons/settings.svg';
import menuIcon from '../../../source/images/icons/menu.svg';

export const Menu = (props) => (
  <div className={`Menu Menu${props.visible}`}>
    <div className='Userinfo Menu-Userinfo'>
      <NavLink to='/' className='Userinfo-Icon' >
        <img src={avatarIcon} alt='Профиль' />
      </NavLink>
      <NavLink to='/' className='Userinfo-Info' >
        <span className='Info-Text' >{props.state.AuthPage.userData.name}</span>
      </NavLink>
    </div>

    <div>
      <button className='Menuicon Topicons-Menuicon' onClick={props.activateMenu} >
        <img src={menuIcon} alt='Меню' />
      </button>
    </div>

    <div className='Userlist Menu-Userlist'>
      <ul className='Userlist List'>
        <li className='List-Item'>
          <input type='checkbox' name='vkl' id='Study' />
          <label htmlFor='Study'>Учёба</label>
          <ul className='Innerlist'>
            <li className='Innerlist-Initem'><NavLink to={`/${props.user}/timetable`}>Расписание</NavLink></li>
            <li className='Innerlist-Initem'><NavLink to={`/${props.user}/marks`}>Успеваемость</NavLink></li>
            <li className='Innerlist-Initem'><NavLink to={`/${props.user}/journalpe`}>Посещения по физкультуре</NavLink></li>
            <li className='Innerlist-Initem'><NavLink to={`/${props.user}/faculties`}>Образовательные программы</NavLink></li>
          </ul>
        </li>
        <li className='List-Item'><NavLink to='/'>Карьера</NavLink></li>
        <li className='List-Item'><NavLink to='/'>Мои финансы</NavLink></li>
        <li className='List-Item'><NavLink to='/'>Справки</NavLink></li>
        <li className='List-Item'><NavLink to='/'>Уведомления</NavLink></li>
        <li className='List-Item'><NavLink to='/'>Обратная связь</NavLink></li>
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

import React from 'react';
import './sidebar.pcss';
import { NavLink } from 'react-router-dom';
import computerIcon from '../../../source/images/icons/computer.svg';
import avatarIcon from '../../../source/images/icons/ava.svg';
import settingsIcon from '../../../source/images/icons/settings.svg';
import menuIcon from '../../../source/images/icons/menu.svg';

export const Sidebar = (props) => (
  <div className={'Sidebar'} >
    <div className='Topicons Sidebar-Topicons'>
      <NavLink to={`/${props.user}`} className='Topicons-Profileicon' >
        <img src={avatarIcon} alt='Профиль' />
      </NavLink>

      <button className='Menuicon Topicons-Menuicon' onClick={props.activateMenu} >
        <img src={menuIcon} alt='Меню' />
      </button>
    </div>

    <div className='Bottomicons Sidebar-Bottomicons'>
      <NavLink to={`/${props.user}/settings`} className='Menuicon Bottomicons-Settingicon ' >
        <img src={settingsIcon} alt='Настройки' />
      </NavLink>

      <NavLink to='#' className='Menuicon Bottomicons-Desktopicon ' >
        <img src={computerIcon} alt='Компьютер' />
      </NavLink>
    </div>
  </div>
);


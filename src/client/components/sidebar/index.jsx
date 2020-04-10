import React from 'react';
import './sidebar.pcss';
import { NavLink } from 'react-router-dom';
import computerIcon from '../../../source/images/icons/computer.svg';
import avatarIcon from '../../../source/images/icons/ava.svg';



export const Sidebar = (props) => {
    return (
        <div className='Sidebar' >
            <div className="Topicons Sidebar-Topicons">
                <NavLink to = '/' className = "Topicons-Profileicon" >
                    <img src={avatarIcon} alt="Профиль" />                
                </NavLink>

                <NavLink to = '#' className = "Menuicon Topicons-Menuicon" >
                    <img src={computerIcon} alt="Меню" />                
                </NavLink>
            </div>

            <div className="Bottomicons Sidebar-Bottomicons">
                <NavLink to = '#' className = "Menuicon Bottomicons-Settingicon " >
                    <img src={computerIcon} alt="Настройки" />                                    
                </NavLink>

                <NavLink to = '#' className = "Menuicon Bottomicons-Desktopicon " >
                    <img src={computerIcon} alt="Компьютер" />                
                </NavLink>
            </div>
        </div>
    )
}
import React from 'react';
import './regsidebar.pcss';
import profileIcon from '../../../source/images/icons/profile.svg';
import computerIcon from '../../../source/images/icons/computer.svg';
import { NavLink } from 'react-router-dom';

export const Regsidebar = (props) => {
    return (
        <div className='Regsidebar' >
            <div className="Icon Regsidebar-Icon Icon-Top ">
                <NavLink to="/">
                    <img className = 'Icon-Img' src={profileIcon} alt="Профиль" />
                </NavLink>
            </div>
            <div className="Icon Regsidebar-Icon Icon-Bottom">
                <NavLink to="#">
                    <img className = 'Icon-Img' src={computerIcon} alt="Профиль" />
                </NavLink>
            </div>
        </div>
    )
}
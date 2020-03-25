import React from 'react';
import './regsidebar.pcss';
import profileIcon from '../../../source/images/icons/profile.svg';
import computerIcon from '../../../source/images/icons/computer.svg';

export const Regsidebar = (props) => {
    return (
        <div className='Regsidebar' >
            <div className="Icon Regsidebar-Icon Icon-Top ">
                <a href="#">
                    <img className = 'Icon-Img' src={profileIcon} alt="Профиль" />
                </a>
            </div>
            <div className="Icon Regsidebar-Icon Icon-Bottom">
                <a href="#">
                    <img className = 'Icon-Img' src={computerIcon} alt="Профиль" />
                </a>
            </div>
        </div>
    )
}
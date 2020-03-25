import React from 'react';
import './regbackground.pcss';
import computerIcon from '../../../source/images/programmer.svg';
import line from '../../../source/images/Vector 1.svg';
import logo from '../../../source/images/icons/logo.svg';
import menu from '../../../source/images/icons/menu.svg';
import menu2 from '../../../source/images/icons/menu2.svg';
import { Authorization } from '../authorization'

export const Regbackground = (props) => {
    return (
        <div className='Regbackground' >
            <div className="Regbackground-Navbar">
                <div className="Navbar-Logo">
                    <div className="Logo-Logo">
                        <img src={logo} alt="" />
                    </div>
                    <div className="Logo-Text">
                        <span className='Logo_first'>Личный кабинет</span>
                        <span className='Logo_second' >Студентов и преподавателей</span>
                    </div>
                </div>
                <div className="Menu-Icon">
                    <img id='Ficon' src={menu} alt="" />
                </div>
            </div>
            < Authorization />
            <img className='Regbackground-Programmer' src={computerIcon} alt="" />
            <div className="Line-Wrap">
                <div className="Img-Wrap">
                    <img className='Regbackground-Line' src={line} alt="" />
                </div>
            </div>
        </div>
    )
}
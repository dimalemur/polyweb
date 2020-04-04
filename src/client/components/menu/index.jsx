import React from 'react';
import './menu.pcss';
import { NavLink } from 'react-router-dom';
import computerIcon from '../../../source/images/icons/computer.svg';
import avatarIcon from '../../../source/images/icons/ava.svg';
import settingsIcon from '../../../source/images/icons/settings.svg';
import menuIcon from '../../../source/images/icons/menu.svg';

export const Menu = (props) => {
    return (
        <div className='Menu' >
            <div className="Userinfo Menu-Userinfo">
                <NavLink to = '/' className = "Userinfo-Icon" >
                    <img src={avatarIcon} alt="Профиль" />
                </NavLink>
                <NavLink to = '/' className = "Userinfo-Info" >
                    <span className = "Info-Text" >Фамилия Имя</span>
                </NavLink>
            </div>

            <div>
              <NavLink to = '#' className = "Menuicon Topicons-Menuicon" >
                  <img src={menuIcon} alt="Меню" />
              </NavLink>
            </div>

            <div className="Userlist Menu-Userlist">
              <ul className="Userlist-List">
                  <li className="Userlist-List-Item">
                      <a href="#">Учёба</a>
                      <ul className="Innerlist">
                         <li className="Innerlist-InItem"><a href="#">Расписание</a></li>
                         <li className="Innerlist-InItem"><a href="#">Успеваемость</a></li>
                         <li className="Innerlist-InItem"><a href="#">Посещения по физкультуре</a></li>
                         <li className="Innerlist-InItem"><a href="#">Образовательные программы</a></li>
                      </ul>
                  </li>
                  <li className="Userlist-List-Item"><a href="#">Карьера</a></li>
                  <li className="Userlist-List-Item"><a href="#">Мои финансы</a></li>
                  <li className="Userlist-List-Item"><a href="#">Справки</a></li>
                  <li className="Userlist-List-Item"><a href="#">Уведомления</a></li>
                  <li className="Userlist-List-Item"><a href="#">Обратная связь</a></li>
              </ul>
          </div>

            <div className="Settingicons Menu-Settingicons">
                <NavLink to = '#' className = "Menuicon Settingicons-Setting" >
                    <img src={settingsIcon} alt="Настройки" />
                </NavLink>

                <NavLink to = '#' className = "Menuicon Settingicons-Desktop" >
                    <img src={computerIcon} alt="Компьютер" />
                </NavLink>
            </div>
        </div>
    )
}

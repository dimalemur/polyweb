import React from 'react'
import './navbar.pcss'

export const Navbar = (props) => {
    return (
        <div className="Navbar-Wrap">
            <div className = 'Navbar Content' >
                <ul className = 'List Navbar-List'>
                    <li className = 'Navbar-List List-Item Item'><a className = 'Item-Link' href="">О нас </a></li>
                    <li className = 'Navbar-List List-Item Item'><a className = 'Item-Link' href="">Команда </a></li>
                    <li className = 'Navbar-List List-Item Item'><a className = 'Item-Link' href="">Портфолио </a></li>
                    <li className = 'Navbar-List List-Item Item'><a className = 'Item-Link' href="">Услуги </a></li>
                    <li className = 'Navbar-List List-Item Item'><a className = 'Item-Link' href="">Контакты </a></li>
                </ul>
            </div>
        </div>
    )
}
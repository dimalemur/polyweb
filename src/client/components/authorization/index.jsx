import React from 'react';
import './authorization.pcss';
import { NavLink } from 'react-router-dom';

export const Authorization = (props) => {
    return (
            <div className="Authorization-Wrap">
                <div className="Authorization">
                <div className="Authorization-Title">
                    <span className="Title-Text">Авторизация</span>
                </div>

                <div className="Form Authorization-Form">
                    <form action="submit" method="post">

                        <div className="Form Form-Login">
                            <label htmlFor="Input-Login">Логин</label>
                            <input className='Input' type="text" id="Input-Login" />
                        </div>

                        <div className="Form Form-Password">
                            <label htmlFor="Input-Password">Пароль</label>
                            <input className='Input' type="password" name="" id="Input-Password" />
                        </div>

                        <div className="Form-Help">
                            <span className="Help-Text">
                                <NavLink to = '/login/authhelp/'>Проблемы со входом?</NavLink>
                            </span>
                        </div>
                        <div className="Button Form-Button">
                            <button  className = "Button-Red" type="submit">Войти</button>
                        </div>

                        <span className="Help-Or">
                            Или
                        </span>
                        <div className="Button Form-Button">
                            <button className = "Button-Blue" >Войти с помощью Google</button>
                        </div>

                    </form>
                </div>

            </div>
            </div>
    )
}
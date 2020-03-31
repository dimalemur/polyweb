import React, { useState, useEffect } from 'react';
import './authorization.pcss';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { asyncGetUser } from '../../store/middleware/asyncGetUser';


const Authorization = (props) => {

    const [login, setUser] = useState('');
    const [password, setPassword] = useState('');

    const onChangeLogin = (event) => {
        setUser(event.target.value)
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value)
    }

    const submitForm = (event) => {
        event.preventDefault()

        fetch('/api/signin', {
            credentials: 'same-origin', 
            method: 'POST',
            body: JSON.stringify({ login: login, password: password }), 
            headers: new Headers({
              'Content-Type': 'application/json'
            }),
          })
          .then(response => response.json())
          .then(token => { //получаем токен по введеному пользователю

              if (token.status == 200 ) {
                  setUser('');
                  setPassword('');
                  props.asyncGetUser(token); // диспатчем asyncGetUser
              }

            })
          .catch(error => console.log(error))
    }

    if (props.state.AuthPage.user.login) {
        return <Redirect to = {`/${props.state.AuthPage.user.login}`} />
    }
    
    return (
            <div className="Authorization-Wrap">
                <div className="Authorization">
                <div className="Authorization-Title">
                    <span className="Title-Text">Авторизация</span>
                </div>
                <div className="Form Authorization-Form">
                    
                    <form action="/api/signin" method="post">

                        <div className="Form Form-Login">
                            <label htmlFor="Input-Login">Логин</label>
                            <input  className='Input' 
                                    type="text" id="Input-Login" 
                                    value = { login } 
                                    onChange = { onChangeLogin } />
                        </div>

                        <div className="Form Form-Password">
                            <label htmlFor="Input-Password">Пароль</label>
                            <input  className='Input' 
                                    type="password" 
                                    id="Input-Password" 
                                    value = { password } 
                                    onChange = { onChangePassword } />
                        </div>

                        <div className="Form-Help">
                            <span className="Help-Text">
                                <NavLink to = '/login/authhelp/'>Проблемы со входом?</NavLink>
                            </span>
                        </div>

                            <div className="Button Form-Button">
                                <button  className = "Button-Red" type="submit" onClick = { submitForm } > Войти </button>
                            </div>

                        <span className="Help-Or">
                            Или
                        </span>
                        <div className="Button Form-Button">
                            <button className = "Button-Blue"  
                                    onClick = { (event)=> event.preventDefault() } >
                                        Войти с помощью Google
                            </button>
                        </div>

                    </form>
                </div>

            </div>
            </div>
    )
}

export default connect(
    state =>({
        state:state
    }),
    dispatch => ({
        asyncGetUser: token => {   
            dispatch(asyncGetUser(token.token))
        }
    })
)(Authorization);
import React, { useState, useEffect } from 'react';
import './authorization.pcss';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { asyncGetUser, asyncAuth } from '../../store/middleware/asyncGetUser';

const Authorization = (props) => {
  const [login, setUser] = useState('');
  const [password, setPassword] = useState('');

  if (props.login) {
    return <Redirect to={`/${login}`} />;
  }

  const onChangeLogin = (event) => {
    setUser(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const submitForm = (event) => {
    event.preventDefault();
    setUser('');
    setPassword('');
    props.asyncAuth(login, password);
  };

  if (props.location.pathname !== '/') {
    return <Redirect to='/' />;
  }

  return (
    <div className='Authorization-Wrap'>
      <div className='Authorization'>
        <div className='Authorization-Title'>
          <span className='Title-Text'>Авторизация</span>
        </div>
        <div className='Form Authorization-Form'>

          <form action='/api/signin' method='post'>

            <div className='Form Form-Login'>
              <label htmlFor='Input-Login'>Логин</label>
              <input className='Input'
                type='text' id='Input-Login'
                value={login}
                onChange={onChangeLogin}
              />
            </div>

            <div className='Form Form-Password'>
              <label htmlFor='Input-Password'>Пароль</label>
              <input className='Input'
                type='password'
                id='Input-Password'
                value={password}
                onChange={onChangePassword}
              />
            </div>

            <div className='Form-Help'>
              <span className='Help-Text'>
                <NavLink to='/login/authhelp/'>Проблемы со входом?</NavLink>
              </span>
            </div>

            <div className='Button Form-Button'>
              <button className='Button-Red' type='submit' onClick={submitForm} > Войти </button>
            </div>

            <span className='Help-Or'>
              Или
                        </span>
            <div className='Button Form-Button'>
              <button className='Button-Blue'
                onClick={(event) => event.preventDefault()}
              >
                Войти с помощью Google
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    state,
    login: state.mainPage.user.login,
  }),
  (dispatch) => ({
    asyncGetUser: (token) => {
      dispatch(asyncGetUser(token.token));
    },
    asyncAuth: (login, password) => {
      dispatch(asyncAuth(login, password));
    },
  }),
)(Authorization);

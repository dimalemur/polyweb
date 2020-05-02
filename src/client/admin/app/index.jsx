import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import { asyncGetUser } from '../store/middleware/asyncGetAdmin';
import { Profile } from '../pages/profile';
import Main from '../pages/main';

const AdminApp = (props) => {
  const token = window.localStorage.getItem('polyAdmin');
  useEffect(() => {
    console.log(props);
    props.asyncGetUser(token);
  }, [props.login]);

  if (props.login) { // если логин в state установлен
    return (
      <div className='App' >
        <div>
          <Route exact path='/admin' component={() => <Redirect to={`/admin/${props.login}`} />} />
          <Route path={'/admin/:user'} component={Profile} />
        </div>
      </div>
    );
  } else if (token !== 'null' && token !== null && !props.login) { // если есть токен, но нет state
    return 'загрузка';
  }
  // если токен не найден
  return (
    < div className='App' >
      <Main />
    </div >);
};

const mapStateToProps = (state) => ({
  state,
  login: state.mainAdminPage.user.login,
});

const mapDispatchToProps = (dispatch) => ({
  asyncGetUser: (token) => {
    dispatch(asyncGetUser(token));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminApp);

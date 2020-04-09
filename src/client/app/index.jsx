import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Authentication } from '../pages/authentication';
import Profile from '../pages/profile';
import './app.pcss';

class App extends Component {
  render() {
    const token = window.localStorage.getItem('polyUser');
    if (this.props.login) { // если логин в state установлен
      return (
        <div className='App' >
          <div>
              <Route exact path = '/' component={() => <Redirect to = {`/${this.props.login}`}/>} />
              <Route path = {'/:user'} component={Profile} />
          </div>
        </div>
      );
    } else if (token !== 'null' && token !== null && !this.props.login) { // если есть токен, но нет state
      return 'загрузка';
    }
    // если токен не найден
    return (
      <div className='App' >
        <div>
          <Route path = '/' component={Authentication} />
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    state,
    login: state.AuthPage.user.login,
  }),
)(App);

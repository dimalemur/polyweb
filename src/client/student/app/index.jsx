import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { Authentication } from '../pages/authentication';
import Profile from '../pages/profile';
import { asyncGetUser } from '../store/middleware/asyncGetUser';

import './app.pcss';

class App extends Component {
  constructor(props) {
    super(props);
    const token = window.localStorage.getItem('polyUser');
    this.props.asyncGetUser(token);
  }

  render() {
    const token = window.localStorage.getItem('polyUser');
    // если логин в state установлен
    if (this.props.login) {
      return (
        <div className='App' >
          <div>
            <Route exact path='/' component={() => <Redirect to={`/${this.props.login}`} />} />
            <Route path={'/:user'} component={Profile} />
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
          <Route path='/' component={Authentication} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state,
  login: state.mainPage.user.login,
});

const mapDispatchToProps = (dispatch) => ({
  asyncGetUser: (token) => {
    dispatch(asyncGetUser(token));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

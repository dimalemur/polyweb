import React , { Component }from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Authentication } from '../pages/authentication';
import Profile from '../pages/profile';
import { connect } from 'react-redux';
import './app.pcss';

class App  extends Component { 
    render(){  
        let token = window.localStorage.getItem('polyUser');           
        if (this.props.login){ // если логин в state установлен
            return (
                <div className='App' >
                    <div>
                        <Switch>
                            <Route  exact path = {`/:user`} component={Profile} />
                            <Redirect to = {`/${this.props.login}`}/>
                        </Switch>
                    </div>
                </div>
            )
        } else if (token !== 'null'  && token !== null && !this.props.login){ //если есть токен, но нет state

            return 'загрузка'
            
        } 
        //если токен не найден
        return (
            <div className='App' >
                <div>
                    <Route  path="/" component={Authentication} />
                    <Route  exact path = {`/:user`} component={Profile} />
                </div>
            </div>
            )
        
    }
}

export default connect(
    state =>({
        state: state,
        login: state.AuthPage.user.login
    }),
    dispatch => ({
    })
)(App);
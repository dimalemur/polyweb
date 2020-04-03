import React , { Component }from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Authentication } from '../pages/authentication';
import Profile from '../pages/profile';
import { connect } from 'react-redux';
import { asyncGetUser } from '../store/middleware/asyncGetUser';
import './app.pcss';

class App  extends Component {
    render(){
        return (
            <div className='App' >

                <Switch>
                    <Route exact path="/" component={Authentication} />
                    <Route  exact path = {`/:user`} component={Profile} />
                    <Redirect to = {`/${this.props.state.login}`}/>
                </Switch> 
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
        asyncGetUser: token => {
            dispatch(asyncGetUser(token))
        }
    })
)(App);

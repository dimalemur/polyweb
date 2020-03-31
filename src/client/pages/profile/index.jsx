import React from 'react';
import './profile.pcss';
import {  NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../../store/reducers/mainPageReducer';


const Profile = (props) => {    
    
    const signOut = (event) => {
        localStorage.setItem('polyUser','');
        props.logOut();
    }      

    if (!window.localStorage.getItem('polyUser')) {                
        return <Redirect to = '/' />
    }
    

    return (
        <div className="Profile">
            {console.log(props.match.params)}
            <NavLink to = '/'>
                <button onClick = { signOut }> Разлогиниться </button>
            </NavLink>
        </div>
    )
}


export default connect(
    state =>({
        state:state
    }),
    dispatch => ({
        logOut: () => {   
            dispatch(logOut())
        }
    })
)(Profile);
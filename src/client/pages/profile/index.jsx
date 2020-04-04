import React, { useEffect } from 'react';
import './profile.pcss';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { asyncGetUserData } from '../../store/middleware/asyncGetUser';
import { Sidebar } from '../../components/sidebar';
import { Menu } from '../../components/menu';
import Profilecontent from '../../components/profileContent';


const Profile = (props) => {
    useEffect(()=> {
        props.asyncGetUserData(token, user)
    }, []);

    const token = window.localStorage.getItem('polyUser');
    const user = props.match.params.user;

    // если токен не найден
    if (!token) {
        return <Redirect to = '/' />
    } else

    return (
        <div className="Profile">
            < Sidebar />
            <Profilecontent user = {user} />
        </div>
    )
}

export default connect(
    state =>({
        state: state,
    }),
    dispatch => ({
        asyncGetUserData: (token,name) => {
            dispatch(asyncGetUserData(token,name))
        }
    })
)(Profile);

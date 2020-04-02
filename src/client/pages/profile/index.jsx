import React, { useEffect } from 'react';
import './profile.pcss';
import {  NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../../store/reducers/mainPageReducer'
import { asyncGetUserData } from '../../store/middleware/asyncGetUser';


const Profile = (props) => {     
    useEffect(()=> {        
        props.asyncGetUserData(token, user)
    }, []);

    const token = window.localStorage.getItem('polyUser');
    const user = props.match.params.user;

    const signOut = (event) => {
        localStorage.setItem('polyUser','');
        props.logOut();
    } 
    
    const backHome = (event) => {
        return <Redirect to = {`/${user}`} />
    }      


    // если токен не найден
    if (!token) {
        return <Redirect to = '/' />
    } else

    return (
        <div className="Profile">
            <NavLink to = '/'>
                <button onClick = { (props.isOwner == "true" ) ? signOut : backHome }>  
                    { (props.isOwner == "true" ) ? "Разлогиниться" : "Домой" }
                </button> 
            </NavLink>

            <p> <b>Факультет : </b> {props.userData.name} </p>
            <p> <b>Курс : </b> {props.userData.faq} </p>
            <p> <b>Группа : </b> {props.userData.course} </p>
            <p> <b>Специальность : </b> {props.userData.group} </p>
            <p> <b>Специализация : </b> {props.userData.specialty} </p>
            <p> <b>Срок обучения : </b> {props.userData.specialization} </p>
            <p> <b>Форма обучения : </b> {props.userData.period} </p>
            <p> <b>Вид финансирования : </b> {props.userData.form} </p>
            <p> <b>Уровень образования : </b>  {props.userData.level}</p>
            <p> <b>Год набора : </b> {props.userData.year} </p>
            <p> <b>Адрес электронной почты : </b> {props.userData.email} </p>
            <p> <b>Номер телефона : </b> {props.userData.tel} </p>
        </div>
    )
}


export default connect(
    state =>({
        state: state,
        userData: state.AuthPage.userData,
        isOwner: state.AuthPage.isOwner.isOwner
    }),
    dispatch => ({
        logOut: () => {   
            dispatch(logOut())
        },
        asyncGetUserData: (token,name) => {              
            dispatch(asyncGetUserData(token,name))
        }
    })
)(Profile);
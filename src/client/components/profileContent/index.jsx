import './profilecontent.pcss';
import React, { useEffect } from 'react';
import {  NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Regnavbar } from '../regnavbar';
import { logOut } from '../../store/reducers/mainPageReducer';
import avatarIcon from '../../../source/images/icons/ava.svg';


const Profilecontent = (props) => {     
    const signOut = (event) => {
        localStorage.setItem('polyUser','');
        props.logOut();
    } 
    
    const backHome = (event) => {
        return <Redirect to = {`/${props.user}`} />
    }      

    return (
        <div className="Profilecontent">
            <Regnavbar />
            <div className="Profilecontent-Wrap">
                <div className="Info Profilecontent-Info">
                    <NavLink to = '/'>
                        <button onClick = { (props.isOwner == "true" ) ? signOut : backHome }>  
                            { (props.isOwner == "true" ) ? "Разлогиниться" : "Домой" }
                        </button> 
                    </NavLink>

                    <div className="Ava Info-Ava">
                        <img className = "Ava-Img" src= { avatarIcon } alt=""/>
                        <span className = "Ava-Text" >{props.userData.name}</span>
                    </div>

                    <div className="Infoblock Info-Personinfo">
                        <p className = 'Infoblock-Title' >
                            Данные обучающегося
                        </p>
                        <p className = "Infoline" > <b>Факультет : </b> {props.userData.name} </p>
                        <p className = "Infoline" > <b>Курс : </b> {props.userData.faq} </p>
                        <p className = "Infoline" > <b>Группа : </b> {props.userData.course} </p>
                        <p className = "Infoline" > <b>Специальность : </b> {props.userData.group} </p>
                        <p className = "Infoline" > <b>Специализация : </b> {props.userData.specialty} </p>
                        <p className = "Infoline" > <b>Срок обучения : </b> {props.userData.specialization} </p> 
                        <p className = "Infoline" > <b>Форма обучения : </b> {props.userData.period} </p>
                        <p className = "Infoline" > <b>Вид финансирования : </b> {props.userData.form} </p>
                        <p className = "Infoline" > <b>Уровень образования : </b>  {props.userData.level}</p>
                        <p className = "Infoline" > <b>Год набора : </b> {props.userData.year} </p>
                    </div>

                    <div className="Infoblock Info-Contactinfo ">
                        <p className = 'Infoblock-Title' >
                            Контактные данные
                        </p>
                        <p className = "Infoline" > <b>Адрес электронной почты : </b> {props.userData.email} </p>
                        <p className = "Infoline" > <b>Номер телефона : </b> {props.userData.tel} </p>
                    </div>
                    <div className="Infoblock Info-Contactinfo ">

                        <p className = 'Infoblock-Title' >
                            Приказы
                        </p>
                    </div>


                </div>
            </div>
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
        }
    })
)(Profilecontent);